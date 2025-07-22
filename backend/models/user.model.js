import crypto from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      public_id: String,
      url: String,
    },
    profile: {
      bio: { type: String, default: "" },
      location: { type: String, default: "" },
      website: { type: String, default: "" },
      analytics: {
        postCount: { type: Number, default: 0 },
      },
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    platforms: [
      {
        name: {
          type: String,
          enum: ["twitter", "facebook", "instagram", "youtube"], // scalable
          required: true,
        },
        platformId: { type: String }, // like twitterId
        username: { type: String },
        accessToken: { type: String },
        refreshToken: { type: String },
        accessSecret: { type: String }, // optional, Twitter v1 support
        expiresIn: { type: Number },
        tokenAddedAt: { type: Date },
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  console.log("Reset token from email", resetToken);

  //by doing this. we can access the fields present in schema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // bina hash kiya hua token ham bhenjege
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
