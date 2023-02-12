import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-errors';
import { Role } from '@prisma/client';

export default function (...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.session?.user?.role)) {
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }
    next();
  };
}
