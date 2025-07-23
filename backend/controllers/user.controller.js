import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { Post } from "../models/post.model.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, mobile, password } = req.body;
    if (!fullname || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // check if profile image is a valid url

    await User.create({
      fullname: fullname,
      email: email,
      mobile: mobile,
      password: hashedPassword,
      avatar: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
    });

    return res
      .status(200)
      .json({ message: "User created successfully!", success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1D",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "User logged out successfully.", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Old password is incorrect", success: false });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};




export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio, location, website, mobile } = req.body;
    const userId = req.id;

    const file = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Upload image if provided
    if (file) {
      
      const fileUri = getDataUri(file);
      
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);      

      // If user already had an avatar, delete it from Cloudinary
      if (user.avatar?.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      }

      user.avatar = {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      };      
    }

    // Update user fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (bio) user.profile.bio = bio;
    if (location) user.profile.location = location;
    if (website) user.profile.website = website;

    await user.save();

    res.status(200).json({ message: "Updated successfully", user, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);

    const posts = user.posts;

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      if (post) {
        await post.deleteOne();
      }
    }

    // Jo Follower's hai unki following mese user ko delete kardo
    const followers = user.followers;
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);

      const index = await follower.followings.indexOf(userId);
      if (index != -1) {
        follower.followings.splice(index, 1);
        await follower.save();
      }
    }

    // Jo Following mai hai unke followers mai se delete kardo
    const followings = user.followings;

    for (let i = 0; i < followings.length; i++) {
      const following = await User.findById(followings[i]);

      const index = await following.followers.indexOf(userId);
      if (index != -1) {
        following.followers.splice(index, 1);
        await following.save();
      }
    }

    await user.deleteOne();

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const myProfile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate("posts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("posts");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({success:true,users});
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const resetPasswordToken = user.getResetPasswordToken();
    // await user.save();
    await user.save({ validateBeforeSave: false });

    // const resetUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/user/password/reset/${resetPasswordToken}`;

    const resetUrl = `http://localhost:5173/reset-password/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link: ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.params.token;
    console.log("token", token);

    // const resetPasswordToken = crypto.createHash('sha256').update(token).digest("hex");
    // console.log("Check if same in database",resetPasswordToken);

    const resetPasswordToken =
      "5bd66f86ac2145936e007e27b5ad5c4000ee434af3cef021fb3acd196bb70d6b";

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    // user.password = newPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Get current authenticated user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId)
      .populate("posts")
      .populate("followers", "fullname avatar")
      .populate("followings", "fullname avatar");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};