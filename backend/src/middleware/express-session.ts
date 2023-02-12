import session from 'express-session';
import connectRedis from 'connect-redis';
import { redisClient } from '../db/redis';

const RedisStore = connectRedis(session);

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
    secure: process.env.NODE_ENV === 'production' ? true : 'auto',
    httpOnly: true,
    // domain: '',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 1000 * 60 * 2, // session max age in milliseconds
  },
});
