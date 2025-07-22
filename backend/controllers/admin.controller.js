import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ActivityLog } from "../models/activityLog.model.js";

// List all users
export const listUsers = async (req, res) => {
  const users = await User.find({}, "-password");
  res.json(users);
};

// List all scheduled posts with status
export const listScheduledPosts = async (req, res) => {
  const posts = await Post.find().populate("owner", "fullname email");
  res.json(posts);
};

// List activity logs
export const listActivityLogs = async (req, res) => {
  const logs = await ActivityLog.find().populate("user", "fullname email");
  res.json(logs);
};