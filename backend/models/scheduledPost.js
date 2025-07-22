// models/ScheduledPost.js
import mongoose from "mongoose"

const scheduledPostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String
  },
  caption: {
    type: String
  },
  image: {
    public_id: String,
    url: String
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  postedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ["scheduled", "posted", "failed"],
    default: "scheduled"
  }
}, { timestamps: true })

export const ScheduledPost =  mongoose.model("ScheduledPost", scheduledPostSchema)
