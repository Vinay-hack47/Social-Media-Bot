import mongoose from "mongoose";

const scheduledItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["tweet", "post"],
    required: true
  },
  platforms: [{
    type: String,
    enum: ["twitter", "facebook", "instagram"],
    required: true
  }],
  content: {
    type: String,
    maxlength: 280
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
  },
  platformResponse: {
    type: Map,
    of: mongoose.Schema.Types.Mixed // to store response from each platform
  },
  meta: {
  taskId: String
}
}, { timestamps: true });

export const ScheduledItem = mongoose.model("ScheduledItem", scheduledItemSchema);
