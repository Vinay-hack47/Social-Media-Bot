// routes/testRedis.js
import express from 'express';
import redisClient from "../utils/redisClient.js"

const router = express.Router();

router.get('/test-redis', async (req, res) => {
  await redisClient.set('foo', 'bar', { EX: 60 }); // expires in 60s
  const value = await redisClient.get('foo');
  res.send(`Value from Redis: ${value}`);
});

export default router;
