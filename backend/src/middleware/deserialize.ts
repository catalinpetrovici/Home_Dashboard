import { NextFunction, Request, Response } from 'express';
import db from '../db/prisma';
import APIError from '../errors/api-errors';
import Logger from '../log/pino';

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.session;
  if (!user) {
    // prettier-ignore
    Logger.info({ HTTP: 'deserialize' }, `❌ Unauthorized to access this route!`);
    throw new APIError.Unauthorized('Unauthorized to access this route');
  }
  if (user) {
    const { id } = user;
    if (!id) {
      // prettier-ignore
      Logger.info({ HTTP: 'deserialize' }, `❌ Unauthorized to access this route!`);
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }

    const data = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, firstName: true },
    });

    if (!data) {
      // prettier-ignore
      Logger.info({ HTTP: 'deserialize' }, `❌ Unauthorized to access this route!`);
      throw new APIError.Unauthorized('Unauthorized to access this route');
    }

    const { email } = data;
    // prettier-ignore
    Logger.info({ HTTP: 'deserialize', email }, `✅ Authorized by deserialize!`);

    res.locals.user = data;

    return next();
  }
  // prettier-ignore
  Logger.info({ HTTP: 'deserialize' }, `❌ Unauthorized to access this route!`);
  throw new APIError.Unauthorized('Unauthorized to access this route');
}
