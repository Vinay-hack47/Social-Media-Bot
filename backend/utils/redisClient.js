import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
  // For Upstash, socket options are not required if using rediss://
});

let isConnected = false;

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

export async function connectRedis() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

export default client;

