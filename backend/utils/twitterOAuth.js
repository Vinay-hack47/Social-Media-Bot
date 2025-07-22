// utils/twitterOAuth.js
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const twitterOAuth = new OAuth({
  consumer: {
    key: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
});

export default twitterOAuth;
