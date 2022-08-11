import { z } from 'zod';
import paginationSchema from './shared/paginationSchema';

const getRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
});

const createRecipeSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    instructions: z.string().min(1),
  }),
});

const updateRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
  body: z.object({
    title: z.string(),
    instructions: z.string(),
  }).partial(),
});

const indexUserRecipesSchema = z.object({
  params: z.object({
    authorId: z.string(),
  }),
  query: paginationSchema,
});

const showOptions = z.enum(['all', 'tailored']);
const indexRecipesSchema = z.object({
  query: paginationSchema.merge(z.object({
    show: showOptions.default('all'),
  })),
});

const deleteRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
});

export {
  indexUserRecipesSchema,
  indexRecipesSchema,
  getRecipeSchema,
  createRecipeSchema,
  updateRecipeSchema,
  deleteRecipeSchema,
};
