import { z } from 'zod';

const getRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
});

const createRecipeSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    authorId: z.string(),
    instructions: z.string().min(1),
  }),
});

const updateRecipeSchema = z.object({
  body: z.object({
    title: z.string()
      .optional(),
    instructions: z.string()
      .optional(),
  }),
});
export {
  getRecipeSchema,
  createRecipeSchema,
  updateRecipeSchema,
};
