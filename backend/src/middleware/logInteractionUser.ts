import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-errors';
import { Role } from '@prisma/client';
import { BaseError } from '../errors/base-error';

export default function logInteractionUser(x: any) {
  return async (
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err) {
      console.log(err);
      console.log(x);
      next(err);
    }
    next();
  };
}
