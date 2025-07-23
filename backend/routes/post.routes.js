import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
import { addComment, createPost, deleteComment, deletePost, followUser, getAllPosts, getPostOfFollowing, likeAndUnlikePost, unFollowUser } from "../controllers/post.controller.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/post/create").post(isAuthenticated,singleUpload, createPost);
router.route("/post/reaction/:id").get(isAuthenticated, likeAndUnlikePost);
router.route("/post/delete/:id").delete(isAuthenticated, deletePost);
router.route("/post/follow/:id").get(isAuthenticated, followUser);
router.route("/post/unfollow/:id").get(isAuthenticated, unFollowUser);
router.route("/postOfFollowings").get(isAuthenticated, getPostOfFollowing);
router.route("/allPosts").get(isAuthenticated, getAllPosts);
router.route("/post/commentOnPost/:id").post(isAuthenticated, addComment);
router.route("/post/:postId/deleteComment/:commentId").delete(isAuthenticated, deleteComment);
// router.post("/schedule", isAuthenticated, singleUpload, schedulePostController)


export default router;