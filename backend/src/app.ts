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

app.use(morgan('dev'));
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(middleware.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', dashboardRouter);
app.use('/api/v1/auth', authRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);
app.use(middleware.errorHandler);

export default app;
