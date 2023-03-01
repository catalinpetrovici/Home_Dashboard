import pino from 'pino';
import { customLogLevelConfiguration } from './config';

export const logger = pino({
  // customLevels: {
  //   fatal: 24,
  //   error: 20,
  //   warn: 16,
  //   info: 12,
  //   http: 10,
  //   debug: 8,
  //   trace: 4,
  // },
  // level: 'info',
  // useOnlyCustomLevels: true,
  transport: {
    target: 'pino-pretty',
    options: {
      // level: 'info',
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      // destination: `${__dirname}/loggerTest.log`,
    },
  },
});
