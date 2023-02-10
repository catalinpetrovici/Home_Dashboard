import { errorHandler } from './errorHandler';
import { notFound } from './notFound';
import session from './express-session';
import authorize from './authorize';
import authorizeRoles from './authorizeRoles';

export default {
  errorHandler,
  notFound,
  session,
  authorize,
  authorizeRoles,
};
