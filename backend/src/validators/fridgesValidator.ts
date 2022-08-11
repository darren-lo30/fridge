import { z } from 'zod';

const getUserFridgeSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export { getUserFridgeSchema };
