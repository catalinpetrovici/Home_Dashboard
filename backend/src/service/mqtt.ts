import Logger from '../log/pino';
import {
  sortDayByHour,
  reduceDataByHours,
  DataInput,
} from '../utils/sortDayByHour';
import { config } from './config';
import mqtt from 'mqtt';
import { redisClient } from '../db/redis';
import db from '../db/prisma';
import {
  DeviceType,
  Status,
  TopicDevice,
  DataType,
  TopicRecord,
} from '@prisma/client';
import { updateStatusDevice } from './utils';
import schedule from 'node-schedule';
import dayjs from 'dayjs';

const trigger24h = schedule.scheduleJob(
  'Reduce Data by Hours for all topic Devices - repeat every 24h',
  '0 0 * * *',
  async function () {
    const topicDevices = await db.topicDevice.findMany({
      where: { isDataRecorded: true },
      select: { id: true, dataType: true },
    });

    const today = new Date(dayjs().format('YYYY-MM-DD'));
    const yesterday = new Date(dayjs().add(-1, 'day').format('YYYY-MM-DD'));

    topicDevices.forEach(async (topicDevice) => {
      const { id, dataType } = topicDevice;

      const dataTopic = await db.$queryRaw<
        DataInput[]
      >`SELECT created_at as time, data as record 
      FROM topic_record 
      WHERE topic_record.topic_id = ${id} 
        AND topic_record.created_at <= ${today}
        AND topic_record.created_at >= ${yesterday} 
      ORDER BY topic_record.created_at;`;

      if (dataType === 'BOOLEAN' || dataType === 'STRING') {
        console.log('STRING & BOOLEAN');
      }

      const data = await reduceDataByHours(
        await sortDayByHour(dataTopic, dataType)
      );

      if (dataType === 'NUMBER' && data) {
        console.log('NUMBER');
        await db.topicRecordByDay.create({
          data: { topicId: id, createdAt: yesterday, data },
        });
      }
      console.log(dataTopic);
    });

    // delete all records from topicRecord
    await db.topicRecord.deleteMany({});

    console.log('Every 5 Minute!', topicDevices);
  }
);

export const mqttClient = mqtt.connect({ ...config });

mqttClient.on('connect', async (CONNAK) => {
  if (mqttClient.connected === true) {
    Logger.info(`${JSON.stringify(CONNAK)}`);
    mqttClient.publish(`server/${process.env.CLIENT_ID}/online`, 'true', {
      qos: 1,
      retain: true,
    });
  }

  // unsubscribe from all topics
  mqttClient.unsubscribe('#');

  const data = await db.topicDevice.findMany();

  data.forEach((topicDevice: TopicDevice) => {
    const { topic, qos: qosDevice } = topicDevice;
    const qos = qosDevice === 0 ? 0 : qosDevice === 1 ? 1 : 2;
    // subscribe to a topic
    mqttClient.subscribe(topic, { qos });
  });
});

mqttClient.on('message', async (topic, message) => {
  await updateStatusDevice(topic, message, db, Status);

  const topicDetails = await redisClient.get(topic);

  if (!topicDetails) {
    const data = await db.topicDevice.findUnique({
      where: { topic },
      select: { id: true, isDataRecorded: true, dataType: true },
    });

    const ONE_HOUR = 60 * 60;

    if (data)
      await redisClient.set(topic, JSON.stringify(data), { EX: ONE_HOUR });
  }

  if (topicDetails) {
    const { id, isDataRecorded } = JSON.parse(topicDetails);

    if (id && isDataRecorded) {
      await db.topicRecord.create({
        data: { topicId: id, data: message.toString() },
      });
    }
  }

  console.log(` topic: ${topic}, message: ${message}`);
});

mqttClient.on('packetsend', function (packet) {
  // console.log(JSON.stringify(packet), 'packet');
});

mqttClient.on('close', function () {
  console.log('Connection closed by client');
});

mqttClient.on('reconnect', function () {
  console.log('Client trying a reconnection');
});

mqttClient.on('offline', function () {
  console.log('Client is currently offline');
});
