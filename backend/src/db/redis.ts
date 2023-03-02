import { createClient } from 'redis';
import { logger } from '../log/pino';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

redisClient.connect().catch((error) => {
  logger.error({ error }, '❌❌❌ Redis: Failed to connect to database!💩');
  // console.error(`\n❌❌❌ Redis: Failed to connect to database!💩 ${error}`);
  process.exit(1);
});
redisClient.on('connect', () => {
  logger.info('✅✅✅ Redis: Connected successfully!💃');
  // console.log('✅✅✅ Redis: Connected successfully!💃');
});
redisClient.set('connected', 'successfully');
