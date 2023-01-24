// eslint-disable-next-line import/no-extraneous-dependencies
require('express-async-errors');

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig } from './corsConfig';

import middleware from './middleware/index';

import dashboardRouter from './api/dashboard/dashboard.routes';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
// app.use(function (req, res, next) {
//   req.headers.origin = req.headers.origin || `http://${req.headers.host}`;
//   next();
// });

app.use(cors(corsConfig));
app.use(express.json());

console.log(__dirname);
console.log(__filename);

app.use('/api/v1', dashboardRouter);

app.use(middleware.notFound);
app.use(middleware.errorHandler);

export default app;
