// import cron from "cron";
// import { ScheduledItem } from "../models/scheduledItem.js";
// import { postToTwitter } from "../services/twitterPoster.js";

// // ⏱ Every 1 minute
// cron.schedule("*/5 * * * *", async () => {
//   console.log("Running scheduled post job...");

//   const now = new Date();

//   const posts = await ScheduledItem.find({
//     scheduledFor: { $lte: now },
//     status: "scheduled",
//     platforms: "twitter"
//   }).populate("user");
//   console.log(posts);
  

//   for (const post of posts) {
//     try {
//       // ✅ Find Twitter credentials from user's platforms array
//       const twitterPlatform = post.user.platforms.find(
//         (p) => p.name === "twitter"
//       );

//       if (!twitterPlatform?.accessToken) {
//         post.status = "failed";
//         post.platformResponse = {
//           twitter: { error: "Missing Twitter access token" }
//         };
//         await post.save();
//         continue;
//       }

//       // ✅ Post to Twitter
//       const response = await postToTwitter({
//         content: post.content,
//         image: post.image,
//         token: twitterPlatform.accessToken
//       });

//       post.status = "posted";
//       post.postedAt = new Date();
//       post.platformResponse = {
//         twitter: response
//       };
//       await post.save();

//       console.log(`✅ Posted to Twitter for user ${post.user._id}`);
//     } catch (error) {
//       post.status = "failed";
//       post.platformResponse = {
//         twitter: { error: error.message }
//       };
//       await post.save();

//       console.log(`❌ Failed to post for user ${post.user._id}:`, error.message);
//     }
//   }
// });

// cron/scheduler.js
// import { CronJob } from "cron";
// import { ScheduledItem } from "../models/scheduledItem.js";
// import { postToTwitter } from "../services/twitterPoster.js";

// export const job = new CronJob("*/5 * * * * *", async () => {
//   console.log("⏱ Running scheduled post job at", new Date().toISOString());

//   const now = new Date();

//   const posts = await ScheduledItem.find({
//     status: "scheduled",
//     scheduledFor: { $lte: now },
//     platforms: { $in: ["twitter"] },
//   }).populate("user");

//   for (const post of posts) {
//     try {
//       const twitterPlatform = post.user?.platforms?.find(
//         (p) => p.name === "twitter"
//       );

//       if (!twitterPlatform?.accessToken) {
//         post.status = "failed";
//         post.platformResponse = {
//           twitter: { error: "Missing Twitter access token" },
//         };
//         await post.save();
//         continue;
//       }

//       const response = await postToTwitter({
//         content: post.content,
//         file: post.image?.url || null,
//         token: twitterPlatform.accessToken,
//       });

//       post.status = "posted";
//       post.postedAt = new Date();
//       post.platformResponse = { twitter: response };
//       await post.save();

//       console.log(`✅ Posted to Twitter for user ${post.user._id}`);
//     } catch (error) {
//       post.status = "failed";
//       post.platformResponse = {
//         twitter: { error: error?.message || "Unknown error" },
//       };
//       await post.save();

//       console.error(`❌ Failed to post for user ${post.user._id}:`, error?.message);
//     }
//   }
// });



// cron/cron.js
import { CronJob } from "cron";
import { ScheduledItem } from "../models/scheduledItem.js";
import { postToTwitter } from "../services/twitterPoster.js";

export const job = new CronJob("*/5 * * * * *", async () => {
  console.log("⏱ Running scheduled post job at", new Date().toISOString());

  const now = new Date();

  const posts = await ScheduledItem.find({
    status: "scheduled",
    scheduledFor: { $lte: now },
    platforms: { $in: ["twitter"] },
  }).populate("user");

  for (const post of posts) {
    try {
      const twitterPlatform = post.user?.platforms?.find(
        (p) => p.name === "twitter"
      );

      if (!twitterPlatform?.accessToken) {
        post.status = "failed";
        post.platformResponse = {
          twitter: { error: "Missing Twitter access token" },
        };
        await post.save();
        continue;
      }

      const response = await postToTwitter({
        content: post.content,
        file: post.image?.url || null,
        token: twitterPlatform.accessToken,
      });

      post.status = "posted";
      post.postedAt = new Date();
      post.platformResponse = { twitter: response };
      await post.save();

      console.log(`✅ Posted to Twitter for user ${post.user._id}`);
    } catch (error) {
      post.status = "failed";
      post.platformResponse = {
        twitter: { error: error?.message || "Unknown error" },
      };
      await post.save();

      console.error(`❌ Failed to post for user ${post.user._id}:`, error?.message);
    }
  }
});
