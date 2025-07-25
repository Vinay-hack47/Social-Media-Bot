import { TwitterApi } from 'twitter-api-v2';
import dotenv from "dotenv";

dotenv.config();

const client = new TwitterApi({
  appKey:    process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken:  process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

export const twitterClient  = client.readWrite;
export const twitterBearer  = bearer.readOnly;