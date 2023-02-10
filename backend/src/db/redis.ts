import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.connect().catch((error) => {
  console.error(`\n❌❌❌ Redis: Failed to connect to database!💩 ${error}`);
  process.exit(1);
});
redisClient.on('connect', () => {
  console.log('✅✅✅ Redis: Connected successfully!💃');
});
redisClient.set('connected', 'successfully');
