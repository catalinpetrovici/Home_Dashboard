import * as z from 'zod';
import { DeviceType, DataType } from '@prisma/client';

export const GetAllTopicsDevice = z.object({});

export const AddTopicDevice = z.object({
  topic: z.string({
    required_error: 'Topic is required',
  }),
  qos: z.number({
    required_error: 'QoS is required',
  }),
  topicName: z.string({
    required_error: 'Topic name is required',
  }),
  deviceType: z.nativeEnum(DeviceType),
  dataType: z.nativeEnum(DataType),
  isDataRecorded: z.boolean(),
  columnDashboard: z.number().optional(),
  lineDashboard: z.number().optional(),
});

export const UpdateTopicDevice = z.object({
  topic: z.string({
    required_error: 'Topic is required',
  }),
  topicName: z.string({
    required_error: 'Topic name is required',
  }),
  qos: z.number({
    required_error: 'QoS is required',
  }),
  deviceType: z.nativeEnum(DeviceType),
  dataType: z.nativeEnum(DataType),
  isDataRecorded: z.boolean({}).optional(),
  columnDashboard: z.number({}).optional(),
  lineDashboard: z.number({}).optional(),
});

export const RemoveTopicDevice = z.object({});

export type GetAllTopicsDevice = z.infer<typeof GetAllTopicsDevice>;
export type AddTopicDevice = z.infer<typeof AddTopicDevice>;
export type UpdateTopicDevice = z.infer<typeof UpdateTopicDevice>;
export type RemoveTopicDevice = z.infer<typeof RemoveTopicDevice>;
