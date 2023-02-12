import { NextFunction, Request, Response } from 'express';
import useragent from 'express-useragent';

export default function (req: Request, res: Response, next: NextFunction) {
  const source = req.headers['user-agent'];
  res.locals.device = '';
  if (source) {
    const { browser, version, os, platform } = useragent.parse(source);
    res.locals.device = `${browser} ${version}. ${os} ${platform}.`;
  }
  next();
}
