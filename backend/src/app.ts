require('dotenv').config();
require('express-async-errors');

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import passport from 'passport';
import { corsConfig } from './corsConfig';

import { mqttClient } from './service/mqtt';

import middleware from './middleware/index';

import healthcheck from './api/healthcheck/healthcheck.routes';
import authRouter from './api/auth/auth.routes';
import dashboardRouter from './api/dashboard/dashboard.routes';
import devicesRouter from './api/device/device.routes';

declare module 'express-session' {
  export interface SessionData {
    user: { id: string };
  }
}

const app = express();

// app.set('trust proxy', 1) // if it matches your public IP address, then the number of proxies is correct and the rate limiter should now work correctly. If not, then keep increasing the number until it does.

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(helmet());
// app.use(cors());
app.use(cors(corsConfig));
app.use(express.json());
app.use(middleware.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', middleware.limiter.apiLimiter, healthcheck);
app.get('/api/v1/ip', (req, res) => res.status(200).send(req.ip));

app.use('/api/v1/auth', middleware.limiter.accountLimiter, authRouter);

app.use('/api/v1/dash', middleware.limiter.apiLimiter, dashboardRouter);
app.use('/api/v1/devices', middleware.limiter.accountLimiter, devicesRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

mqttClient.on('connect', () => {});

export default app;
