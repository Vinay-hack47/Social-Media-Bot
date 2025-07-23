import { Post } from "../models/post.model.js";
// import { ScheduledPost } from "../models/ScheduledPost.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


// Create a new post for all selected platforms
export const createPost = async (req, res) => {
  try {
    const { caption, content } = req.body;

    const userId = req.id;
    let image = null;

    const file = req.file;

    // Upload image if provided
    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      image = {
        public_id: cloudResponse?.public_id,
        url: cloudResponse?.secure_url,
      };
    }
    const user = await User.findById(userId);

    const post = new Post({
      owner: user,
      caption,
      content,
      image,
    });

    await post.save();

    user.posts.push(post._id);
    await user.save();

    res
      .status(201)
      .json({ message: "Post created successfully.", post, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const likeAndUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
        post,
      });
    } else {
      post.likes.push(userId);

      await post.save();

      await res
        .status(200)
        .json({ message: "Post Liked", success: true, post });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() == userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted", success: true });
    } else {
      return res
        .status(403)
        .json({ message: "You don't have permission to delete this post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.id;
    const followId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const toFollow = await User.findById(followId);
    if (!toFollow) {
      return res
        .status(404)
        .json({ success: false, message: "Particular user not found" });
    }

    if (toFollow.followers.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "You are already following" });
    }

    toFollow.followers.push(userId);
    user.followings.push(followId);

    await toFollow.save();
    await user.save();

    res.status(200).json({
      message: `You are following ${toFollow.fullname}`,
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const userId = req.id;
    const toUnFollowId = req.params.id;

    const user = await User.findById(userId);

    const toUnFollow = await User.findById(toUnFollowId);
    if (!toUnFollow) {
      return res
        .status(400)
        .json({ success: false, message: "User not found to unfollow" });
    }

    if (toUnFollow.followers.includes(userId)) {
      user.followings.splice(toUnFollowId, 1);
      toUnFollow.followers.splice(userId, 1);

      await toUnFollow.save();
      await user.save();

      res
        .status(200)
        .json({
          message: `You unfollowed ${toUnFollow.fullname}`,
          success: true,
          user,
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "You are not following" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
export const getPostOfFollowing = async (req, res) => {
  try {
    const userId = req.id;

    // Get current user with followings
    const user = await User.findById(userId).populate("followings");

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Collect all following user IDs
    const followingIds = user.followings.map((following) => following._id);

    // Get all posts created by the followings
    const posts = await Post.find({ owner: { $in: followingIds } })
      .sort({ createdAt: -1 }) // optional: newest first
      .populate([
        {
          path: "owner",
          select: "fullname email avatar",
        },
        {
          path: "likes",
          select: "fullname",
        },
        {
          path: "comments.user",
          select: "fullname",
        },
      ]);

    return res.status(200).json({
      message: "Posts of following users",
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Error in getPostOfFollowing:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .sort({ createdAt: -1 })
      // .populate({
      //   path: "owner"
      // })
      .populate([
        {
          path: "owner",
          select: "fullname email avatar", // User details
        },
        {
          path: "likes",
          select: "fullname", // Who liked it
        },
        {
          path: "comments.user",
          select: "fullname", // Commenter names
        },
      ]);

    res.status(200).json({
      message: "All posts from all users",
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    // const { message } = req.body;
    const { newComment } = req.body;
    console.log("newComment",newComment);
    console.log(req.body);
    
    
    if (
      !newComment ||
      typeof newComment !== "string" ||
      newComment.trim() === ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Comment cannot be empty" });
    }

    const userId = req.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    // console.log(post);

    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }

    let commentIndex = -1;

    post.comments &&
      post.comments.forEach((item, index) => {
        if (item.user.toString() === userId.toString()) {
          commentIndex = index;
          console.log("index", index);
        }
      });
    console.log("commentIndex", commentIndex);

    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = newComment;
      await post.save();

      return res
        .status(200)
        .json({ message: "Comment Updated", success: true });
    } else {
      post.comments.push({
        user: userId,
        comment: newComment,
      });
    }
    await post.save();

    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};



export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = post.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    const isOwner = post.owner.toString() === userId;
    const isCommenter = comment.user.toString() === userId;

    if (!isOwner && !isCommenter) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
    await post.save();

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// controllers/postController.js


// export const schedulePostController = async (req, res) => {
//   try {
//     const { content, caption, scheduledFor } = req.body

//     if (!scheduledFor || (!content && !caption && !req.file)) {
//       return res.status(400).json({ message: "Missing required fields" })
//     }

//     let image = null

//     if (req.file) {
//       const fileUri = getDataUri(req.file)
//       const uploaded = await cloudinary.uploader.upload(fileUri.content, {
//         folder: "scheduled-posts"
//       })
//       image = {
//         public_id: uploaded.public_id,
//         url: uploaded.secure_url
//       }
//     }

//     const newScheduledPost = await ScheduledPost.create({
//       user: req.id,
//       content,
//       caption,
//       scheduledFor,
//       image
//     })

//     res.status(201).json({
//       message: "Post scheduled successfully",
//       post: newScheduledPost
//     })
//   } catch (err) {
//     console.error("Post scheduling error:", err)
//     res.status(500).json({ message: "Server error", error: err.message })
//   }
// }
