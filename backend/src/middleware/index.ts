import { errorHandler } from './errorHandler';
import { notFound } from './notFound';
import session from './express-session';
import deserialize from './deserialize';
import authorizeRoles from './authorizeRoles';
import limiter from './express-rate-limit';
import userAgent from './express-useragent';

export default {
  errorHandler,
  notFound,
  session,
  deserialize,
  authorizeRoles,
  limiter,
  userAgent,
};
