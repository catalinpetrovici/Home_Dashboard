import session from 'express-session';
import connectRedis from 'connect-redis';
import { redisClient } from '../db/redis';

const RedisStore = connectRedis(session);

redisClient.connect().catch((error) => {
  console.error(`\n❌❌❌ Redis: Failed to connect to database!💩 ${error}`);
});
redisClient.on('connect', () => {
  console.log('✅✅✅ Redis: Connected successfully!💃');
});
redisClient.set('connected', 'successfully');

export default session({
  name: 'sessionId',
  secret: 'mySecret',
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({
    client: redisClient,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60, // session max age in milliseconds
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production' ? true : 'auto',
  },
});
