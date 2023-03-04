import { Request, Response } from 'express';

type Healthcheck = {
  uptime: number;
  responseTime: number;
  message: string;
  timestamp: number;
};

export async function healthcheck(req: Request, res: Response) {
  const healthcheck: Healthcheck = {
    uptime: Math.round(process.uptime()),
    responseTime: process.hrtime()[1] / 1000000000,
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (error: any) {
    healthcheck.message = `${JSON.stringify(error)}`;
    res.status(503).send();
  }
}
