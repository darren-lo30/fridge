import { z } from 'zod';
import paginationSchema from './shared/paginationSchema';

const indexIngredientTypesSchema = z.object({
  query: paginationSchema,
});

export {
  indexIngredientTypesSchema,
};
