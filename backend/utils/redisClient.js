import { createClient } from 'redis';


const client = createClient({
  url: process.env.REDIS_URL, 
  socket: {
    tls: true,
    rejectUnauthorized: false, 
  },
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// await client.connect();     -> Connect when trying to add the add a new platform, otherwise it is giving error of connection

export default client;

