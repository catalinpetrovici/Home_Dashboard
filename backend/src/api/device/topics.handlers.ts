import { Request, Response } from 'express';
import db from '../../db/prisma';
import StatusCodes from '../../interfaces/types/http.model';
import APIError from '../../errors/api-errors';
import {
  GetAllTopicsDevice,
  AddTopicDevice,
  UpdateTopicDevice,
  RemoveTopicDevice,
} from './topics.models';
import {
  unsubscribeToTopic,
  subscribeToTopic,
  invalidateTopicCache,
} from '../../service/utils';

async function getAll(req: Request, res: Response): Promise<void> {
  const { deviceId: id } = req.params;

  const data = await db.topicDevice.findMany({
    where: { deviceId: { equals: id } },
  });

  res.status(StatusCodes.OK).json({ length: data.length, data });
}

async function add(req: Request, res: Response): Promise<void> {
  // Validate the input with zod
  const { deviceId: id } = req.params;

  const {
    topic,
    qos,
    topicName,
    type,
    isDataRecorded,
    columnDashboard,
    lineDashboard,
  } = await AddTopicDevice.parseAsync(req.body);

  const data = await db.topicDevice.findMany({ where: { topic } });

  if (data.length > 0) {
    throw new APIError.BadRequestError('Topic already exists');
  }

  const topicDevice = await db.topicDevice.create({
    data: {
      deviceId: id,
      topic,
      qos,
      topicName,
      type,
      isDataRecorded,
      columnDashboard,
      lineDashboard,
    },
  });

  await subscribeToTopic(topic, qos);

  res.status(StatusCodes.CREATED).json({ ...topicDevice });
}

async function update(req: Request, res: Response): Promise<void> {
  // Validate the input with zod
  const { topicId } = req.params;
  const {
    topic,
    qos,
    topicName,
    type,
    isDataRecorded,
    columnDashboard,
    lineDashboard,
  } = await UpdateTopicDevice.parseAsync(req.body);

  const data = await db.topicDevice.findFirst({
    where: { id: topicId },
    select: { topic: true },
  });

  if (!data) {
    throw new APIError.BadRequestError('This topic do not match our records');
  }

  const topicDevice = await db.topicDevice.update({
    where: {
      id: topicId,
    },
    data: {
      topic,
      qos,
      topicName,
      type,
      isDataRecorded,
      columnDashboard,
      lineDashboard,
    },
  });

  await invalidateTopicCache(data.topic);

  res.status(StatusCodes.OK).json({ ...topicDevice });
}

async function remove(req: Request, res: Response): Promise<void> {
  const { topicId } = req.params;

  const data = await db.topicDevice.findFirst({
    where: { id: topicId },
    select: { topic: true, qos: true },
  });

  if (!data) {
    throw new APIError.BadRequestError('This topic do not match our records');
  }

  const device = await db.topicDevice.delete({
    where: {
      id: topicId,
    },
  });

  const { topic, qos } = data;

  await unsubscribeToTopic(topic, qos);
  await invalidateTopicCache(topic);

  res.status(StatusCodes.OK).json({ message: 'Deleted!' });
}

async function refresh(req: Request, res: Response): Promise<void> {
  const { topicId } = req.params;

  const data = await db.topicDevice.findFirst({
    where: { id: topicId },
    select: { topic: true, qos: true },
  });

  if (!data) {
    throw new APIError.BadRequestError('This topic do not match our records');
  }

  const { topic, qos } = data;

  await unsubscribeToTopic(topic, qos);
  await invalidateTopicCache(topic);
  await subscribeToTopic(topic, qos);

  res.status(StatusCodes.OK).json({ message: 'Refreshed!' });
}

export default {
  getAll,
  update,
  add,
  remove,
  refresh,
};
