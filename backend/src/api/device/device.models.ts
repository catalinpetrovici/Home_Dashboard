import * as z from 'zod';
import { DeviceType } from '@prisma/client';

export const AddDevice = z.object({
  deviceName: z.string({
    required_error: 'Device name is required',
  }),
  deviceFamily: z.string({
    required_error: 'Device family is required',
  }),
});

export const UpdateDevice = z.object({
  id: z.string({
    required_error: 'Device id is required',
  }),
  deviceName: z.string({
    required_error: 'Device name is required',
  }),
  deviceFamily: z.string({
    required_error: 'Device family is required',
  }),
});

export const RemoveDevice = z.object({
  id: z.string({
    required_error: 'Device id is required',
  }),
});

export type AddDevice = z.infer<typeof AddDevice>;
export type UpdateDevice = z.infer<typeof UpdateDevice>;
export type RemoveDevice = z.infer<typeof RemoveDevice>;

// deviceName: 'test',
// deviceFamily: 'test',
// defaultName: 'test',
// topic: 'test/test',
// isDataRecorded: false,
// columnDasboard: 0,
// lineDasboard: 0,
// data: 'test',
