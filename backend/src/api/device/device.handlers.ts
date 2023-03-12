import { Request, Response } from 'express';
import db from '../../db/prisma';
import APIError from '../../errors/api-errors';
import StatusCodes from '../../interfaces/types/http.model';
import { AddDevice, UpdateDevice, RemoveDevice } from './device.models';

async function getAll(req: Request, res: Response): Promise<void> {
  const data = await db.device.findMany();

  res.status(StatusCodes.OK).json({ length: data.length, data });
}

async function add(req: Request, res: Response): Promise<void> {
  // Validate the input with zod
  const { deviceName, deviceFamily } = await AddDevice.parseAsync(req.body);

  const device = await db.device.create({
    data: {
      deviceName,
      deviceFamily,
    },
  });

  res.status(StatusCodes.CREATED).json({ ...device });
}

async function update(req: Request, res: Response): Promise<void> {
  // Validate the input with zod
  const { id } = req.params;

  const { deviceName, deviceFamily } = await UpdateDevice.parseAsync(req.body);

  const device = await db.device.update({
    where: {
      id,
    },
    data: {
      deviceName,
      deviceFamily,
    },
  });

  res.status(StatusCodes.OK).json({ ...device });
}

async function remove(req: Request, res: Response): Promise<void> {
  const { id } = await RemoveDevice.parseAsync(req.params);

  const device = await db.device.delete({
    where: {
      id,
    },
  });

  res.status(StatusCodes.OK).json({ ...device });
}

export default { getAll, update, add, remove };
