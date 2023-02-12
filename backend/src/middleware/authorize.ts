import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-errors';
import HttpStatusCode from '../interfaces/types/http.model';

export default function (req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;
  if (!user) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .send('Unauthorized to access this route');
  }
  next();
}
