import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import {
  createFridgeIngredientSchema,
  createRecipeIngredientSchema,
  deleteIngredientSchema,
  indexFridgeIngredientsSchema,
  updateIngredientSchema,
} from '@src/validators/ingredientsValidator';
import express from 'express';

const indexFridgeIngredients = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { fridgeId },
    query: { cursor, limit, offset },
  } = await parseRequest(indexFridgeIngredientsSchema, req);
  const ingredients = await prisma.ingredient.findMany({
    where: {
      fridgeId,
    },
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      ingredientType: true,
    },
  });

  return res.json({ ingredients });
};

const createFridgeIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: {
      fridgeId,
    },
    body:
    {
      amount,
      ingredientTypeId,
      measurementUnitId,
    },
  } = await parseRequest(createFridgeIngredientSchema, req);

  const fridge = await prisma.fridge.findUniqueOrThrow({
    where: {
      id: fridgeId,
    },
  });

  const ingredient = await prisma.ingredient.create({
    data: {
      fridgeId: fridge.id,
      ingredientTypeId,
      amount,
      measurementUnitId,
    },
    include: {
      ingredientType: true,
    },
  });

  return res.json({ ingredient });
};

const createRecipeIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: {
      recipeId,
    },
    body:
    {
      amount,
      ingredientTypeId,
      measurementUnitId,
    },
  } = await parseRequest(createRecipeIngredientSchema, req);

  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: {
      id: recipeId,
    },
  });

  const ingredient = await prisma.ingredient.create({
    data: {
      recipeId: recipe.id,
      ingredientTypeId,
      amount,
      measurementUnitId,
    },
  });

  return res.json({ ingredient });
};

const updateIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { ingredientId },
    body: { amount, measurementUnitId },
  } = await parseRequest(updateIngredientSchema, req);

  const ingredient = await prisma.ingredient.update({
    where: {
      id: ingredientId,
    },
    data: {
      amount,
      measurementUnitId,
    },
  });

  return res.status(200).json({ ingredient });
};

const deleteIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { ingredientId } } = await parseRequest(deleteIngredientSchema, req);

  await prisma.ingredient.delete({
    where: {
      id: ingredientId,
    },
  });

  return res.status(200).json({ message: 'Ingredient was successfully deleted' });
};

export {
  createFridgeIngredient,
  createRecipeIngredient,
  updateIngredient,
  deleteIngredient,
  indexFridgeIngredients,
};
