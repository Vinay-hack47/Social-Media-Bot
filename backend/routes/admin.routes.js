import express from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
import { listUsers, listScheduledPosts, listActivityLogs } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, listUsers);
router.get("/posts", isAuthenticated, isAdmin, listScheduledPosts);
router.get("/logs", isAuthenticated, isAdmin, listActivityLogs);

export default router;