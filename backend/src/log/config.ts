const LOG_LEVEL = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
  WARN: 'WARN',
} as const;

type ObjectValues<T> = T[keyof T];

type LogLevel = ObjectValues<typeof LOG_LEVEL>;

export const customLogLevelConfiguration = {};
