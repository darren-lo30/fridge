/* eslint-disable import/prefer-default-export */
import { z } from 'zod';

const createIngredientSchema = z.object({
  params: z.object({
    fridgeId: z.string(),
  }),
  body: z.object({
    ingredientTypeId: z.string(),
    amount: z.preprocess(
      Number,
      z.number()
        .gte(0),
    ),
    measurementUnitId: z.string(),
  }),
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
  createIngredientSchema,
  deleteIngredientSchema,
};
