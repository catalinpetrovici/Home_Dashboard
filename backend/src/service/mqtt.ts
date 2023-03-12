import Logger from '../log/pino';
import { config } from './config';
import mqtt from 'mqtt';
import { redisClient } from '../db/redis';
import db from '../db/prisma';
import { DeviceType, Status, TopicDevice } from '@prisma/client';
import { updateStatusDevice } from './utils';

type TopicDetails = {
  topicId: string;
  isDataRecorded: boolean;
} | null;

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
      select: { id: true, isDataRecorded: true },
    });

    if (data?.id) await redisClient.set(topic, JSON.stringify(data));
  }

  if (topicDetails) {
    const { id, isDataRecorded } = JSON.parse(topicDetails);

    if (isDataRecorded && id) {
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
