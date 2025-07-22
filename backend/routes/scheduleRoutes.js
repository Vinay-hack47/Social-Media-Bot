import express from "express";
import { singleUpload } from "../middleware/multer.js";
import {  createScheduledItem, getAllScheduledPostOfUser } from "../controllers/schedule.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();
// const upload = multer({ dest: "uploads/" });

router.post("/", isAuthenticated, singleUpload, createScheduledItem);
router.get("/getAllScheduledPost", isAuthenticated, getAllScheduledPostOfUser);

export default router;
