require('dotenv').config();
import pino from 'pino';
import { streams } from './config';

export default pino(
  {
    level: 'info',
    timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString('ro')}"`,
    formatters: {
      bindings: (bindings) => {
        return {};
      },
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  },
  pino.multistream(streams())
);
