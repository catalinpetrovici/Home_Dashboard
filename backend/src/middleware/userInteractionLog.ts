import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/api-errors';

interface UserRequest extends Request {
  user: { role: Role };
}

export default async function (...roles: Role[]) {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }
    const { role } = req.user;
    if (!roles.includes(role)) {
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }
    next();
  };
}
