import pino from 'pino';
import pretty from 'pino-pretty';

function formatDate() {
  const date = new Date();
  return `${date.getMonth() + 1}-${date.getDate()}`;
}

export function streams() {
  const streamsDev = [
    {
      stream: pretty({
        destination: process.stdout,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      }),
    },
  ];

  if (process.env.NODE_ENV !== 'development') return streamsDev;

  const streamsProd = [
    {
      stream: pretty({
        destination: process.stdout,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      }),
    },
    {
      stream: pino.destination({
        dest: `${__dirname}/${formatDate()}.log`,
        sync: true,
      }),
    },
  ];

  return streamsProd;
}

const LOG_LEVEL = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
  WARN: 'WARN',
} as const;

type ObjectValues<T> = T[keyof T];

type LogLevel = ObjectValues<typeof LOG_LEVEL>;
