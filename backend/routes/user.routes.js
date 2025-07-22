import express from "express";
import { changePassword, deleteMyProfile, forgotPassword, getAllUser, getCurrentUser, getUserProfile, login, logout, myProfile, register, resetPassword, updateProfile } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router()

router.route("/register").post(singleUpload , register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/changePassword").post(isAuthenticated,changePassword)
router.route("/updateProfile").post(isAuthenticated,singleUpload,updateProfile)
router.route("/deleteMyProfile").delete(isAuthenticated,deleteMyProfile)
router.route("/myProfile").get(isAuthenticated,myProfile)
router.route("/getUserProfile/:id").get(isAuthenticated,getUserProfile)
router.route("/getAllUser").get(isAuthenticated,getAllUser)
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated, getCurrentUser);

export default router