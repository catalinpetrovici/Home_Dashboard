import { createClient } from 'redis';
import Logger from '../log/pino';

export const redisClientLegacy = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
});

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClientLegacy.connect().catch((error) => {
  Logger.error(
    { error },
    '❌❌❌ RedisLegacy: Failed to connect to database!💩'
  );
  process.exit(1);
});
redisClientLegacy.on('connect', () => {
  Logger.info('✅✅✅ RedisLegacy: Connected successfully!💃');
});

redisClient.connect().catch((error) => {
  Logger.error({ error }, '❌❌❌ Redis: Failed to connect to database!💩');
  process.exit(1);
});
redisClient.on('connect', () => {
  Logger.info('✅✅✅ Redis: Connected successfully!💃');
});
