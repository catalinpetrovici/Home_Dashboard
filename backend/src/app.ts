import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

// CORS CONFIG
const whitelist = ['http://192.168.0.111:5173'];
const corsOptions = {
  // credentials: true,
  origin: function (origin: any, callback: any) {
    console.log('origin', origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
      // callback(null, true);
    }
  },
};

app.use(morgan('dev'));
app.use(helmet());
app.use(express.static(path.join(__dirname + '/public')));
app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || `http://${req.headers.host}`;
  next();
});

app.use(cors(corsOptions));
// app.use(cors({ origin: '*' }));
app.use(express.json());

console.log(__dirname);
console.log(__filename);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
