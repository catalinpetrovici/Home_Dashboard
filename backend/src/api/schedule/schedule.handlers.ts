import { Request, Response } from 'express';
import StatusCodes from '../../interfaces/types/http.model';
import schedule from 'node-schedule';
import APIError from '../../errors/api-errors';
import { mqttClient } from '../../service/mqtt';
import db from '../../db/prisma';
import { AddSchedule, UpdateSchedule, RemoveSchedule } from './schedule.models';

async function getAll(req: Request, res: Response) {
  const jobs = Object.keys(schedule.scheduledJobs);
  const scheduledJobs = await db.schedule.findMany({});

  res.status(200).json({
    memory: {
      length: jobs.length,
      jobs,
    },
    database: {
      length: scheduledJobs.length,
      jobs: {
        ...scheduledJobs,
      },
    },
  });
}

async function add(req: Request, res: Response) {
  // Validate the input with zod
  const { name, rule, repeat, topic, message } = await AddSchedule.parseAsync(
    req.body
  );

  const dbSchedule = await db.schedule.findFirst({ where: { name } });
  if (dbSchedule) {
    throw new APIError.BadRequestError(
      'A schedule with this name already exist'
    );
  }

  const newSchedule = await db.schedule.create({
    data: { name, rule, repeat, topic, message },
  });

  if (repeat === 'ONCE') {
    schedule.scheduleJob(name, rule, async function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });

      const job = schedule.scheduledJobs[newSchedule.name];
      job.cancel();

      await db.schedule.delete({ where: { id: newSchedule.id } });
    });
  }

  if (repeat === 'INTERVAL') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  if (repeat === 'INTERVAL_BETWEEN_TIMES') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  if (repeat === 'AT_SPECIFIC_TIME') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  res.status(StatusCodes.OK).json({ ...newSchedule });
}

async function update(req: Request, res: Response) {
  // Validate the input with zod
  const { id, name, rule, repeat, topic, message } =
    await UpdateSchedule.parseAsync(req.body);

  const dbSchedule = await db.schedule.findFirst({ where: { id } });
  if (!dbSchedule) {
    throw new APIError.BadRequestError('Schedule does not exist in database');
  }

  const dbScheduleName = await db.schedule.findFirst({ where: { name } });
  if (dbScheduleName) {
    throw new APIError.BadRequestError(
      'A schedule with this name already exist in database'
    );
  }

  const oldSchedule = schedule.scheduledJobs[dbSchedule.name];
  if (!oldSchedule) {
    throw new APIError.BadRequestError('Schedule does not exist in memory');
  }

  oldSchedule.cancel();

  const updatedSchedule = await db.schedule.update({
    where: { id },
    data: { name, rule, repeat, topic, message },
  });

  if (repeat === 'ONCE') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });

      const job = schedule.scheduledJobs[name];
      job.cancel();
    });
  }

  if (repeat === 'INTERVAL') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  if (repeat === 'INTERVAL_BETWEEN_TIMES') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  if (repeat === 'AT_SPECIFIC_TIME') {
    schedule.scheduleJob(name, rule, function () {
      mqttClient.publish(topic, message, {
        qos: 0,
      });
    });
  }

  res.status(StatusCodes.OK).json({ ...updatedSchedule });
}

async function remove(req: Request, res: Response) {
  const { id } = req.body;

  const dbSchedule = await db.schedule.findFirst({ where: { id } });

  if (!dbSchedule)
    throw new APIError.BadRequestError(`No cron job found with id: ${id}`);

  const removedSchedule = schedule.scheduledJobs[dbSchedule.name];

  if (!removedSchedule)
    throw new APIError.BadRequestError(
      `No cron job found with name ${dbSchedule.name}`
    );

  removedSchedule.cancel();
  await db.schedule.delete({ where: { id: dbSchedule.id } });

  res
    .status(StatusCodes.OK)
    .json({ message: `Cron job with ID ${id} removed!` });
}

export { getAll, add, update, remove };
