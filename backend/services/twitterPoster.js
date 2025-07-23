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
