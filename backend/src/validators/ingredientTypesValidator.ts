import { z } from 'zod';
import paginationSchema from './shared/paginationSchema';
import searchSchema from './shared/searchSchema';

const showOptions = z.enum(['all', 'tailored']);
const indexIngredientTypesSchema = z.object({
  query: paginationSchema.merge(
    searchSchema,
  ).merge(
    z.object({
      show: showOptions.default('all'),
    }),
  ),
});

export {
  indexIngredientTypesSchema,
};
