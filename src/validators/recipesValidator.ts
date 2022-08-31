import { z } from 'zod';
import paginationSchema from './shared/paginationSchema';

const showRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
});

const recipePublishedSchema = z.object({
  body: z.object({
    published: z.preprocess(Boolean, z.boolean()),
  }),
});

const createRecipeSchema = z.object({
  body: z.object({
    title: z.string(),
    thumbnail: z.string(),
    description: z.string(),
    instructions: z.string(),
    published: z.preprocess(Boolean, z.boolean().default(false)),
  }).partial(),
});

const updateRecipeSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
  body: z.object({
    title: z.string(),
    description: z.string(),
    instructions: z.string(),
    published: z.preprocess(Boolean, z.boolean()),
    thumbnail: z.string(),
  }).partial(),
});

const indexUserRecipesSchema = z.object({
  params: z.object({
    authorId: z.string(),
  }),
  query: paginationSchema.merge(z.object({
    published: z.preprocess(Boolean, z.boolean().optional()),
  })),
});

const showOptions = z.enum(['all', 'tailored']);
const indexRecipesSchema = z.object({
  query: paginationSchema.merge(z.object({
    show: showOptions.default('all'),
    published: z.preprocess(Boolean, z.boolean()),
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
  showRecipeSchema,
  createRecipeSchema,
  updateRecipeSchema,
  deleteRecipeSchema,
  recipePublishedSchema,
};
