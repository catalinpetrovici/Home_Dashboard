import { BaseError } from './base-error';
import { ZodError } from 'zod';

class ErrorHandler {
  // constructor() {}

  public async handleError(err: Error): Promise<void> {
    // logger.error(err);
    // SEND EMAIL
    // SEND NOTIFICATIONS
    console.log(
      'ErrorHandler: Verific aceasta erroare de tip uncaughtException! ',
      err,
      err.stack
    );
  }

  public isTrustedError(error: Error) {
    return (
      (error instanceof BaseError && error.isOperational) ||
      error instanceof ZodError
    );
  }
}

export const errorHandler = new ErrorHandler();
