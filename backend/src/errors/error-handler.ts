import { BaseError } from './base-error';
import { ZodError } from 'zod';

class ErrorHandler {
  // constructor() {}

  public async handleError(err: Error): Promise<void> {
    // logger.error(err);
    // SEND EMAIL
    // SEND NOTIFICATIONS
    console.log(
      'ErrorHandler: Uncaught Exception! Not caught by a programming construct or by the programmer!',
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

export const errorHandlerIns = new ErrorHandler();
