import { mqttClient } from './mqtt';
import { redisClient } from '../db/redis';

export async function subscribeToTopic(topic: string, qosDevice: number) {
  const qos = qosDevice === 0 ? 0 : qosDevice === 1 ? 1 : 2;
  mqttClient.subscribe(topic, { qos });
}
export async function unsubscribeToTopic(topic: string, qosDevice: number) {
  const qos = qosDevice === 0 ? 0 : qosDevice === 1 ? 1 : 2;
  mqttClient.subscribe(topic, { qos });
}

export async function invalidateTopicCache(topic: string) {
  console.log('invalidate');
  await redisClient.del(topic);
}

export async function updateStatusDevice(
  topic: any,
  message: any,
  db: any,
  Status: any
) {
  if (topic.endsWith('online') || topic.endsWith('status')) {
    const data = await db.topicDevice.findUnique({
      where: { topic },
      select: { deviceId: true },
    });

    const status =
      message.toString() === 'true' ? Status.ONLINE : Status.OFFLINE;

    if (data?.deviceId)
      await db.device.update({
        where: {
          id: data?.deviceId,
        },
        data: { status },
      });
  }
}
