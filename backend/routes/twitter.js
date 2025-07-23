// routes/twitter.js
import express from "express";
import axios from "axios";
import twitterOAuth from "../utils/twitterOAuth.js";
import redisClient, { connectRedis } from "../utils/redisClient.js";
import { decrypt, encrypt } from "../utils/encrypt.js";
import { TwitterApi } from "twitter-api-v2";
import { User } from "../models/user.model.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { singleUpload } from "../middleware/multer.js";
import { twitterClient } from "../utils/twitterClient.js";

const router = express.Router();

router.get("/request-token", async (req, res) => {
  await connectRedis();
  const url = "https://api.twitter.com/oauth/request_token";
  const oauth = twitterOAuth.authorize({
    url,
    method: "POST",
    data: { oauth_callback: process.env.TWITTER_CALLBACK_URL },
  });

  try {
    const response = await axios.post(url, null, {
      headers: { Authorization: twitterOAuth.toHeader(oauth).Authorization },
      params: { oauth_callback: process.env.TWITTER_CALLBACK_URL },
    });

    const params = new URLSearchParams(response.data);
    const oauth_token = params.get("oauth_token");
    const oauth_token_secret = params.get("oauth_token_secret");

    // Store secret in Redis (short-lived)
    await redisClient.set(`twitter_oauth:${oauth_token}`, oauth_token_secret, {
      EX: 600,
    });

    // Redirect user to Twitter login
    res.json({
      redirect_url: `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get request token" });
  }
});

router.get("/access-token", async (req, res) => {
  await connectRedis();
  const { oauth_token, oauth_verifier } = req.query;

  if (!oauth_token || !oauth_verifier) {
    return res.status(400).json({ error: "Missing oauth_token or verifier" });
  }

  const oauth_token_secret = await redisClient.get(
    `twitter_oauth:${oauth_token}`
  );

  if (!oauth_token_secret) {
    return res.status(400).json({ error: "Token expired or invalid" });
  }

  const url = "https://api.twitter.com/oauth/access_token";
  const oauth = twitterOAuth.authorize(
    { url, method: "POST" },
    { key: oauth_token, secret: oauth_token_secret }
  );

  try {
    const response = await axios.post(url, null, {
      headers: { Authorization: twitterOAuth.toHeader(oauth).Authorization },
      params: { oauth_token, oauth_verifier },
    });

    const data = new URLSearchParams(response.data);

    const accessToken = data.get("oauth_token");
    const accessSecret = data.get("oauth_token_secret");
    const screenName = data.get("screen_name");
    const userId = data.get("user_id");

    // 🔐 Store these securely (encrypt before storing in DB if needed)
    // For demo, store in Redis
    await redisClient.set(
      `twitter_user:${userId}`,
      JSON.stringify({ accessToken, accessSecret }),
      {
        EX: 60 * 60 * 24, // 1 day
      }
    );

    res.json({ userId, screenName, accessToken, accessSecret });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

//todo-> Here we cannot use isAuthenticated middleware because during auth Process we redirect to twitter then come here at
//todo-> callback, so now twitter don't know about jwt token so req.id will be failed, so we will store userId in redis and
//todo-> then we will access it in callback

// OAuth 2.0 with PKCE Callback


router.get("/callback", async (req, res) => {
  await connectRedis();
  console.log("Callback Called");

  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ message: "Missing code or state in query." });
  }

  try {
    const [codeVerifier, userId] = await Promise.all([
      redisClient.get(`twitter_code_verifier:${state}`),
      redisClient.get(`twitter_user_id:${state}`),
    ]);

    if (!codeVerifier || !userId) {
      return res
        .status(400)
        .json({ message: "Session expired or invalid state." });
    }

    const basicAuth = Buffer.from(
      `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
    ).toString("base64");

    const tokenResponse = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.TWITTER_CALLBACK_URL,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    if (!access_token || !refresh_token) {
      return res.status(400).json({ message: "Missing tokens from Twitter." });
    }

    const twitterUserRes = await axios.get(
      "https://api.twitter.com/2/users/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const twitterUser = twitterUserRes.data?.data;
    if (!twitterUser) {
      return res
        .status(400)
        .json({ message: "Unable to fetch Twitter user info." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "App user not found." });
    }

    const alreadyExists = user.platforms?.some(
      (acc) => acc.name === "twitter" && acc.platformId === twitterUser.id
    );

    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: "Twitter account already connected." });
    }

    const encryptedAccessToken = encrypt(access_token);
    const encryptedRefreshToken = encrypt(refresh_token);

    user.platforms.push({
      name: "twitter",
      platformId: twitterUser.id,
      username: twitterUser.username,
      accessToken: encryptedAccessToken,
      refreshToken: encryptedRefreshToken,
      expiresIn: expires_in,
      tokenAddedAt: new Date(),
    });

    await user.save();

    return res.send("Twitter connected successfully!");
  } catch (error) {
    console.error(
      "Twitter OAuth callback error:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      message: "Twitter auth failed",
      error: error.response?.data || error.message,
    });
  }
});

router.post("/post-tweet", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // 🧠 Find Twitter credentials from platforms[]
    const twitterAccount = user.platforms.find(
      (p) => p.name === "twitter" && p.accessToken
    );

    if (!twitterAccount) {
      return res.status(401).json({ error: "Twitter not connected." });
    }

    const decryptedAccessToken = decrypt(twitterAccount.accessToken);
    console.log("Decrypted token:", decryptedAccessToken);


    const twitterRes = await axios.post(
      "https://api.twitter.com/2/tweets",
      { text: content },
      {
        headers: {
          Authorization: `Bearer ${decryptedAccessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = twitterRes.data;

    if (!twitterRes.ok) {
      console.error("Twitter API error:", data);
      return res.status(400).json({ error: data });
    }

    res
      .status(200)
      .json({
        message: "Tweet posted check it on your twitter!",
        tweet: data,
        success: true,
      });
  } catch (err) {
    console.error("Tweet Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.post("/tweet-with-image", isAuthenticated, singleUpload, async (req, res) => {
  const userId = req.id;
  const { caption = "", content = "" } = req.body;
  const file = req.file;

  if (!file || !file.buffer) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    // 🔍 Get user and access token
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const twitterAccount = user.platforms.find(
      (p) => p.name === "twitter" && p.accessToken
    );
    if (!twitterAccount) {
      return res.status(401).json({ error: "Twitter not connected." });
    }

    const accessToken = decrypt(twitterAccount.accessToken);

    // ☁️ Upload image to Cloudinary
    const fileUri = getDataUri(file); // Convert buffer to base64 Data URI
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const imageUrl = cloudResponse.secure_url;

    // 🐦 Post tweet with image URL in text
    const tweetText = `${caption}\n\n${content}\n\n${imageUrl}`;
    const tweetRes = await axios.post(
      "https://api.twitter.com/2/tweets",
      { text: tweetText },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "Tweet posted successfully with Cloudinary image URL!",
      tweet: tweetRes.data,
      success: true,
    });
  } catch (err) {
    console.error("Tweet with image via Cloudinary failed:", err?.response?.data || err);
    return res.status(500).json({
      error: "Tweet with image via Cloudinary failed",
      details: err?.response?.data || err.message || "Unknown error",
    });
  }
});



router.get("/revoke/:platformName", isAuthenticated, async (req, res) => {
  try {
    const userId = req.id;
    const { platformName } = req.params;
    console.log(platformName);

    if (!platformName) {
      return res.status(400).json({ error: "Platform name is required." });
    }

    const user = await User.findById(userId);
    if (!user || !Array.isArray(user.platforms)) {
      return res
        .status(404)
        .json({ error: "User not found or no platforms connected." });
    }

    // Find the index of the connected platform
    const index = user.platforms.findIndex(
      (p) => p.name === platformName.toLowerCase()
    );

    if (index === -1) {
      return res.status(404).json({ error: `${platformName} not connected.` });
    }

    const platform = user.platforms[index];

    // Decrypt tokens (optional, just for debug)
    const decryptedAccessToken = decrypt(platform.accessToken);
    const decryptedRefreshToken = platform.refreshToken
      ? decrypt(platform.refreshToken)
      : null;

    console.log(`Revoking ${platformName} access for user: ${user.email}`);
    console.log("Access Token:", decryptedAccessToken);
    if (decryptedRefreshToken)
      console.log("Refresh Token:", decryptedRefreshToken);

    // Remove the platform entry from array
    user.platforms.splice(index, 1);
    await user.save();

    return res
      .status(200)
      .json({
        success: true,
        message: `${platformName} access revoked.`,
        user,
      });
  } catch (err) {
    console.error("Revoke error:", err);
    return res.status(500).json({
      error: "Failed to revoke platform access",
      details: err.message,
    });
  }
});
export default router;
