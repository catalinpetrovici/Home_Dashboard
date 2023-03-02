import pino, { DestinationStream } from 'pino';
import pretty from 'pino-pretty';

const date = new Date();
const formatDate = `${date.getMonth() + 1}-${date.getDate()}`;

const streams = [
  {
    stream: pretty({
      destination: process.stdout,
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
    }),
  },
  {
    stream: pino.destination({ dest: `${__dirname}/${formatDate}.log` }),
  },
];

export const logger = pino(
  {
    level: 'debug',
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
  pino.multistream(streams)
);

//     // customLevels: {
//     //   fatal: 24,
//     //   error: 20,
//     //   warn: 16,
//     //   info: 12,
//     //   http: 10,
//     //   debug: 8,
//     //   trace: 4,
//     // },
//     // useOnlyCustomLevels: true,
