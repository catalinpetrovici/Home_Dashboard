import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors/base-error';
import ErrorResponse from '../interfaces/ErrorResponse';
import { errorHandlerIns } from '../errors/error-handler';
import HttpStatusCode from '../interfaces/types/http.model';
import { ZodError } from 'zod';

export function errorHandler(
  err: BaseError,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const responseError = {
    message: err.message,
    methodName: process.env.NODE_ENV === 'production' ? '🥞' : err.methodName,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  };

  if (!errorHandlerIns.isTrustedError(err)) {
    errorHandlerIns.handleError(err);
    next();
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Something went wrong try again later.',
    });
  }

  let statusCode = err.httpCode !== 200 ? err.httpCode : 500;

  if (err instanceof ZodError) {
    responseError.message = err.issues[0].message;
    statusCode = 400;
  }

  console.log('err.httpCode', err.httpCode);
  console.log('statusCode', statusCode);

  return res.status(statusCode).json(responseError);
}
