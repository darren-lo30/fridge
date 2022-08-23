import { z } from 'zod';
import paginationSchema from './shared/paginationSchema';

const showOptions = z.enum(['all', 'tailored']);
const indexIngredientTypesSchema = z.object({
  query: paginationSchema.merge(z.object({
    show: showOptions.default('all'),
    search: z.string().optional(),
  })),
});

export {
  indexIngredientTypesSchema,
};
