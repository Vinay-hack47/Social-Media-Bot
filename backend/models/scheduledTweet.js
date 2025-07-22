// models/ScheduledTweet.js
import mongoose from "mongoose"

const scheduledTweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  caption: {
    type: String,
    required: true,
    maxlength: 280
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
  twitterPostId: {
    type: String // Optional: for showing a link to the tweet
  }
}, { timestamps: true })

export const scheduledTweet = mongoose.model("scheduledTweet", scheduledTweetSchema)
