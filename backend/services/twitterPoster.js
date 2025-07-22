// import axios from "axios";
// import { twitterClient } from "../utils/twitterClient.js";

// export const postToTwitter = async ({ content, file, token }) => {
//   console.log(content, file, token);
  

//     try {
//       const mediaId = await twitterClient.v1.uploadMedia(file.buffer, {
//         mimeType: file.mimetype,
//       });
  
//       const tweet = await twitterClient.v2.tweet({
//         text: `${caption}\n\n${content}`,
//         media: { media_ids: [mediaId] },
//       });
  
//       return res.status(200).json({
//         message: "Tweet posted check it on your twitter!",
//         tweet,
//         success: true,
//       });
//     } catch (err) {
//       console.error("Tweet failed:", err);
//       return res.status(500).json({
//         error: "Tweet failed",
//         details: err?.data?.detail || err.message || "Unknown error",
//       });
//     }
 
// };

//  const endpoint = "https://api.twitter.com/2/tweets";

//   const headers = {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json"
//   };

//  const body = {
//     text: content
//     // If image upload supported later: include media_id here
//   };

 // const response = await axios.post(endpoint, body, { headers });

//   // return response.data;
// import { TwitterApi } from "twitter-api-v2";
// import { v2 as cloudinary } from "cloudinary";
// import getDataUri from "../utils/dataUri.js"; // Ensure this converts req.file to base64-like URI

// export const postToTwitter = async ({ content, file, token }) => {
//   const twitterClient = new TwitterApi(token); // per-user access token
//   try {
//     let tweetText = content;

//     if (file) {
//       // Step 1: Get file URI
//       const fileUri = getDataUri(file);

//       // Step 2: Upload image to Cloudinary
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//       // Step 3: Append image URL to tweet text
//       tweetText += `\n\n${cloudResponse.secure_url}`;
//     }

//     // Step 4: Post tweet
//     const tweet = await twitterClient.v2.tweet({
//       text: tweetText,
//     });

//     return {
//       message: "Tweet posted successfully!",
//       tweet,
//       success: true,
//     };
//   } catch (err) {
//     console.error("Tweet failed:", err);
//     return {
//       error: "Tweet failed",
//       details: err?.data?.detail || err.message || "Unknown error",
//       success: false,
//     };
//   }
// };

import { TwitterApi } from "twitter-api-v2";
import fetch from "node-fetch";

export const postToTwitter = async ({ content, file, token }) => {
  const twitterClient = new TwitterApi(token);

  try {
    let tweet;

    if (file) {
      const response = await fetch(file);
      const buffer = Buffer.from(await response.arrayBuffer());

      const mediaId = await twitterClient.v1.uploadMedia(buffer, {
        mimeType: 'image/jpeg', // change if needed (e.g., image/png, video/mp4)
      });

      tweet = await twitterClient.v2.tweet({
        text: content,
        media: { media_ids: [mediaId] },
      });
    } else {
      tweet = await twitterClient.v2.tweet({ text: content });
    }

    return {
      message: "Tweet posted successfully!",
      tweet,
      success: true,
    };
  } catch (err) {
    console.error("Tweet failed:", err);
    return {
      error: "Tweet failed",
      details: err?.data?.detail || err.message || "Unknown error",
      success: false,
    };
  }
};
