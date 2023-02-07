import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});
