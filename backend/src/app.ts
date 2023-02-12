require('dotenv').config();
require('express-async-errors');

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { corsConfig } from './corsConfig';

import authRouter from './api/auth/auth.routes';

import middleware from './middleware/index';

import dashboardRouter from './api/dashboard/dashboard.routes';

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

const app = express();

// app.set('trust proxy', 1) // if it matches your public IP address, then the number of proxies is correct and the rate limiter should now work correctly. If not, then keep increasing the number until it does.

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(middleware.session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/ip', (req, res) => res.send(req.ip));
app.use('/api/v1', dashboardRouter);
app.use('/api/v1/auth', middleware.limiter.accountLimiter, authRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
