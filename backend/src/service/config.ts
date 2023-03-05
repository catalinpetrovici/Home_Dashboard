import { IClientOptions } from 'mqtt';
require('dotenv').config();

export const config: IClientOptions = {
  host: process.env.MQTT_HOST,
  port: Number(process.env.MQTT_PORT),
  clientId: `${process.env.CLIENT_ID}`,
  clean: false,
  reconnectPeriod: 1000,
  keepalive: 60,
  will: {
    topic: `server/${process.env.CLIENT_ID}/online`,
    payload: 'false',
    qos: 1,
    retain: true,
  },
};
