import { z } from 'zod';

const searchSchema = z.object({
  search: z.string().optional(),
});

export default searchSchema;
