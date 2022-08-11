import { z } from 'zod';

const paginationSchema = z.object({
  limit: z.union([
    z.undefined(),
    z.preprocess(Number, z.number()
      .int()
      .gte(0)
      .optional()
      .default(100))]),
  offset: z.union([
    z.undefined(),
    z.preprocess(Number, z.number()
      .int()
      .gte(0)
      .optional())]),
  cursor: z.string()
    .optional(),
});

export default paginationSchema;
