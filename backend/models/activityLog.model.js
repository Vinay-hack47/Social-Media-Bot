import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  details: { type: Object },
  status: { type: String, enum: ["success", "failed"], default: "success" },
  createdAt: { type: Date, default: Date.now }
});

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);