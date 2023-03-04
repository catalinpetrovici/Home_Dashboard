import { createClient } from 'redis';
import Logger from '../log/pino';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.connect().catch((error) => {
  Logger.error({ error }, '❌❌❌ Redis: Failed to connect to database!💩');
  process.exit(1);
});
redisClient.on('connect', () => {
  Logger.info('✅✅✅ Redis: Connected successfully!💃');
});
redisClient.set('connected', 'successfully');
