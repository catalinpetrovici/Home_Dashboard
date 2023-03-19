import * as z from 'zod';
import { Repeat } from '@prisma/client';

export const AddSchedule = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  rule: z.string({
    required_error: 'Rule is required',
  }),
  repeat: z.nativeEnum(Repeat),
  topic: z.string({
    required_error: 'Topic is required',
  }),
  message: z.string({
    required_error: 'Message is required',
  }),
});

export const UpdateSchedule = z.object({
  id: z.string({
    required_error: 'Id is required',
  }),
  name: z.string({
    required_error: 'Name is required',
  }),
  rule: z.string({
    required_error: 'Rule is required',
  }),
  repeat: z.nativeEnum(Repeat),
  topic: z.string({
    required_error: 'Topic is required',
  }),
  message: z.string({
    required_error: 'Message is required',
  }),
});

export const RemoveSchedule = z.object({
  id: z.string({
    required_error: 'Name is required',
  }),
});

export type AddSchedule = z.infer<typeof AddSchedule>;
export type UpdateSchedule = z.infer<typeof UpdateSchedule>;
export type RemoveSchedule = z.infer<typeof RemoveSchedule>;
