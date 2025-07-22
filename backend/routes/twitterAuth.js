import express from 'express'
import { generateCodeChallenge, generateCodeVerifier } from '../utils/pkce.js'
import redisClient from '../utils/redisClient.js'
import querystring from 'querystring'
import { isAuthenticated } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/twitter/auth-url',isAuthenticated, async (req, res) => {
  console.log("Auth called");
  
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = generateCodeChallenge(codeVerifier)
  const state = crypto.randomUUID()
  const userId = req.id;

  // Store code_verifier temporarily in Redis w ith key = state
  await redisClient.set(`twitter_code_verifier:${state}`, codeVerifier, { EX: 600 });
  await redisClient.set(`twitter_user_id:${state}`, userId);

  const params = {
    response_type: 'code',
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_CALLBACK_URL,
    scope: 'tweet.read tweet.write users.read offline.access',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  }

  const authUrl = `https://twitter.com/i/oauth2/authorize?${querystring.stringify(params)}`

  res.status(200).json({ authUrl, success: true })
});


export default router
