import { z, ZodRawShape } from 'zod';

export const validate =
  <A extends ZodRawShape>(zodObj: A) =>
  (i: any) =>
    z.object(zodObj).strict().strip().parseAsync(i);
