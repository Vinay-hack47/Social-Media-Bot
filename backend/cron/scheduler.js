// import cron from "node-cron"
// import ScheduledPost from "../models/ScheduledPost.js"
// import ScheduledTweet from "../models/scheduledTweet.js"
// import { Post } from "../models/Post.js"
// import cloudinary from "../utils/cloudinary.js"
// import { TwitterApi } from "twitter-api-v2"
// import User from "../models/User.js"
// import decryptToken from "../utils/decryptToken.js" // custom helper we'll define

// // Every minute
// cron.schedule("* * * * *", async () => {
//   console.log("🔁 Running cron job for scheduled posts and tweets...")

//   const now = new Date()

//   // 📌 1. Post Scheduled Social Posts
//   const duePosts = await ScheduledPost.find({ scheduledFor: { $lte: now }, status: "scheduled" })

//   for (const post of duePosts) {
//     try {
//       await Post.create({
//         caption: post.caption,
//         content: post.content,
//         image: post.image,
//         owner: post.user,
//         createdAt: new Date()
//       })

//       post.status = "posted"
//       post.postedAt = new Date()
//       await post.save()

//       console.log(`✅ Posted internal post by user ${post.user}`)
//     } catch (err) {
//       post.status = "failed"
//       await post.save()
//       console.error(`❌ Failed to post internal post for ${post.user}`, err.message)
//     }
//   }

//   // 📌 2. Post Scheduled Tweets
//   const dueTweets = await ScheduledTweet.find({ scheduledFor: { $lte: now }, status: "scheduled" })

//   for (const tweet of dueTweets) {
//     try {
//       const user = await User.findById(tweet.user)

//       if (!user || !user.twitterAuth) continue

//       const accessToken = decryptToken(user.twitterAuth.accessToken) // decrypted from Redis or DB
//       const accessSecret = decryptToken(user.twitterAuth.accessSecret)

//       const client = new TwitterApi({
//         appKey: process.env.TWITTER_APP_KEY,
//         appSecret: process.env.TWITTER_APP_SECRET,
//         accessToken,
//         accessSecret
//       })

//       const { data } = await client.v2.tweet(tweet.caption)

//       tweet.status = "posted"
//       tweet.postedAt = new Date()
//       tweet.twitterPostId = data.id
//       await tweet.save()

//       console.log(`🐦 Tweeted: ${tweet.caption}`)
//     } catch (err) {
//       tweet.status = "failed"
//       await tweet.save()
//       console.error(`❌ Failed to tweet for user ${tweet.user}`, err.message)
//     }
//   }

//   console.log("✅ Cron job finished.\n")
// })
