import { NextFunction, Request, Response } from 'express';
import db from '../db/prisma';
import APIError from '../errors/api-errors';
import Logger from '../log/pino';

function unauthorized() {
  Logger.info({ HTTP: 'deserialize' }, `❌ Unauthorized to access this route!`);
  throw new APIError.Unauthorized('Unauthorized to access this route');
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req.session;
  if (!user) {
    return unauthorized();
  }
  if (user) {
    const { id } = user;
    if (!id) {
      return unauthorized();
    }

    const data = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, firstName: true },
    });

    if (!data) {
      return unauthorized();
    }
    if (!req.session.cookie.expires) {
      return unauthorized();
    }

    const { email } = data;

    Logger.info(
      { HTTP: 'deserialize', email },
      `✅ Authorized by deserialize!`
    );

    await db.userSession.create({
      data: {
        userId: id,
        sessionToken: req.sessionID,
        expires: req.session.cookie.expires,
      },
    });

    res.locals.user = data;

    return next();
  }

  return unauthorized();
}
