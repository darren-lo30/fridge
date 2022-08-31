/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import pagionationSchema from './shared/paginationSchema';
import searchSchema from './shared/searchSchema';

const createIngredientBody = z.object({
  ingredientTypeId: z.string(),
  displayAmount: z.preprocess(
    Number,
    z.number()
      .gte(0),
  ),
  displayUnit: z.string(),
});

const indexFridgeIngredientsSchema = z.object({
  query: pagionationSchema.merge(searchSchema),
  params: z.object({
    fridgeId: z.string(),
  }),
});

const createFridgeIngredientSchema = z.object({
  params: z.object({
    fridgeId: z.string(),
  }),
  body: createIngredientBody,
});

const createRecipeIngredientSchema = z.object({
  params: z.object({
    recipeId: z.string(),
  }),
  body: createIngredientBody,
});

const updateIngredientSchema = z.object({
  params: z.object({
    ingredientId: z.string(),
  }),
  body: z.object({
    displayAmount: z.preprocess(
      Number,
      z.number()
        .gte(0),
    ),
    displayUnit: z.string(),
  })
    .partial()
    .refine((data) => (data.displayAmount ? data.displayUnit : !data.displayUnit), 'Must include displayUnit and displayAmount together.'),
});

const deleteIngredientSchema = z.object({
  params: z.object({
    ingredientId: z.string(),
  }),
});

export {
  updateIngredientSchema,
  createFridgeIngredientSchema,
  createRecipeIngredientSchema,
  deleteIngredientSchema,
  indexFridgeIngredientsSchema,
};
