import { TwitterApi } from "twitter-api-v2"
import User from "../models/User.js"
import { decrypt } from "./encrypt.js"

export async function getTwitterClient(userId) {
  const user = await User.findById(userId)
  if (!user || !user.twitter?.accessToken) throw new Error("Twitter not connected")

  return new TwitterApi({
    appKey: process.env.TWITTER_APP_KEY,
    appSecret: process.env.TWITTER_APP_SECRET,
    accessToken: decrypt(user.twitter.accessToken),
    accessSecret: decrypt(user.twitter.accessSecret)
  })
}
  