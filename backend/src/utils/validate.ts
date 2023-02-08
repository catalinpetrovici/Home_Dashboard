import { AnyZodObject, ZodError, z } from 'zod';

export async function zodParse<T extends AnyZodObject>(
  schema: T,
  obj: object
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(obj);
  } catch (error) {
    console.log(`utils / validate / index`, error);
    if (error instanceof ZodError) {
      throw new Error(error.message);
    }
    throw new Error(JSON.stringify(error));
  }
}
