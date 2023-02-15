import { NextFunction, Request, Response } from 'express';
import db from '../db/prisma';
import APIError from '../errors/api-errors';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.session;
  if (!user) {
    throw new APIError.Unauthorized('Unauthorized to access this route');
  }
  if (user) {
    const { id } = user;
    if (!id) {
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }

    const data = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, firstName: true },
    });

    if (!data) {
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }

    res.locals.user = data;

    return next();
  }
  throw new APIError.Unauthorized('Unauthorized to access this route');
}
