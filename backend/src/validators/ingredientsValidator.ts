/* eslint-disable import/prefer-default-export */
import { z } from 'zod';
import pagionationSchema from './shared/paginationSchema';

const createIngredientBody = z.object({
  ingredientTypeId: z.string(),
  amount: z.preprocess(
    Number,
    z.number()
      .gte(0),
  ),
  measurementUnitId: z.string(),
});

const indexFridgeIngredientsSchema = z.object({
  query: pagionationSchema,
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
    amount: z.preprocess(
      Number,
      z.number()
        .gte(0)
        .optional(),
    ),
    measurementUnitId: z.string()
      .optional(),
  }),
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
