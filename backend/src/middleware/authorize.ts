import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-errors';

export default function (req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;
  if (!user) {
    throw new APIError.Unauthorized('Unauthorized to access this route');
  }
  next();
}
