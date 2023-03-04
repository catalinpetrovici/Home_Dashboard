import { NextFunction, Request, Response } from 'express';
import NotFound from '../errors/api-errors/not-found';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new NotFound(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}
