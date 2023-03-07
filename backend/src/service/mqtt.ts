import Logger from '../log/pino';
import { separateFamilyClientAndTopic } from './utils';
import { config } from './config';
import { topicsQos0, topicsQos1 } from './topics';
import mqtt from 'mqtt';
import { redisClient } from '../db/redis';
import db from '../db/prisma';
import { DeviceType, Status } from '@prisma/client';

export const mqttClient = mqtt.connect({ ...config });

const topic = 'topic/name';

mqttClient.on('connect', (CONNAK) => {
  if (mqttClient.connected === true) {
    Logger.info(`${JSON.stringify(CONNAK)}`);
    mqttClient.publish(`server/${process.env.CLIENT_ID}/online`, 'true', {
      qos: 1,
      retain: true,
    });
  }

  // unsubscribe from all topics
  mqttClient.unsubscribe('#');
  // subscribe to a topic
  topicsQos0.forEach((topic: any) => {
    mqttClient.subscribe(topic, { qos: 0 });
  });
  topicsQos1.forEach((topic: any) => {
    mqttClient.subscribe(topic, { qos: 1 });
  });
});

mqttClient.on('message', async (clientAndTopic, message) => {
  const { family, client, topic } =
    separateFamilyClientAndTopic(clientAndTopic);
  const clientR = await redisClient.get(topic);

  if (!clientR) {
    console.log(
      `client ${client} does not exist, topic: ${topic}, message: ${message}`
    );
    await redisClient.set(topic, client);
    await db.device.create({
      data: {
        deviceFamily: family,
        deviceName: client,
        defaultName: client,
        topic: topic,
        data: message.toString(),
      },
    });
  }

  if (topic.endsWith('online') || topic.endsWith('status')) {
    const status =
      message.toString() === 'true' ? Status.ONLINE : Status.OFFLINE;
    await db.deviceStatus.upsert({
      where: { deviceName: client },
      update: { status: status },
      create: { deviceName: client, status: status },
    });
  }

  await db.device.updateMany({
    where: { topic },
    data: { data: message.toString() },
  });

  console.log(`client: ${client}, topic: ${topic}, message: ${message}`);
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
