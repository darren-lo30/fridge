import { z } from 'zod';

const paginatedIndexSchema = z.object({
  query: z.object({
    limit: z.union([
      z.undefined(),
      z.preprocess(Number, z.number()
        .int()
        .gte(0)
        .optional())]),
    offset: z.union([
      z.undefined(),
      z.preprocess(Number, z.number()
        .int()
        .gte(0)
        .optional())]),
    cursor: z.string()
      .optional(),
  }),
});

export default paginatedIndexSchema;
