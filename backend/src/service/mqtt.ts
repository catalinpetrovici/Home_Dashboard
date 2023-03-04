import Logger from '../log/pino';
import { separateClientAndTopic } from './utils';
import { config } from './config';
import mqtt from 'mqtt';
import { redisClient } from '../db/redis';
import db from '../db/prisma';
import { DeviceType } from '@prisma/client';

export const mqttClient = mqtt.connect({ ...config });

const topic = 'topic/name';

mqttClient.on('connect', (CONNAK) => {
  if (mqttClient.connected === true) {
    Logger.info(`${JSON.stringify(CONNAK)}`);
    mqttClient.publish(`${process.env.CLIENT_ID}/status`, 'online', {
      qos: 1,
      retain: true,
    });
  }

  // unsubscribe from all topics
  mqttClient.unsubscribe('#');
  // subscribe to a topic
  mqttClient.subscribe('ESP8266/DHT22/TEMP');
  mqttClient.subscribe('ESP8266/DHT22/HUM');
  mqttClient.subscribe('shellies/shelly/relay/0/power');
  mqttClient.subscribe('shellies/shelly/relay/1/power');
  mqttClient.subscribe(topic, { qos: 1 });
});

mqttClient.on('message', async (clientAndTopic, message) => {
  const { client, topic } = separateClientAndTopic(clientAndTopic);
  const clientR = await redisClient.get(topic);

  if (!clientR) {
    console.log(`client does not exist, ${client}`);
    await redisClient.set(topic, client);
    await db.device.create({
      data: {
        deviceId: client,
        topic: topic,
        data: message.toString(),
      },
    });
  }
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
