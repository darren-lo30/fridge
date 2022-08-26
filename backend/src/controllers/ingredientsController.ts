import { Prisma } from '@prisma/client';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { convertToBaseAmount, convertToReturnIngredient } from '@utils/unitConversions';
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

  const returnIngredients = ingredients.map((ingredient) => convertToReturnIngredient(ingredient));
  return res.json({ ingredients: returnIngredients });
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
      ingredientTypeId,
      displayAmount,
      displayUnit,
    },
  } = await parseRequest(createFridgeIngredientSchema, req);

  const ingredientType = await prisma.ingredientType.findUniqueOrThrow({
    where: { id: ingredientTypeId },
  });

  const amount = convertToBaseAmount(displayAmount, ingredientType.measurementType, displayUnit);

  const ingredient = await prisma.ingredient.create({
    data: {
      fridgeId,
      ingredientTypeId,
      amount,
      displayUnit,
    },
    include: {
      ingredientType: true,
    },
  });

  const returnIngredient = convertToReturnIngredient(ingredient);
  return res.json({ ingredient: returnIngredient });
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
      displayAmount,
      ingredientTypeId,
      displayUnit,
    },
  } = await parseRequest(createRecipeIngredientSchema, req);

  const ingredientType = await prisma.ingredientType.findUniqueOrThrow({
    where: { id: ingredientTypeId },
  });

  const amount = convertToBaseAmount(displayAmount, ingredientType.measurementType, displayUnit);
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
      displayUnit,
    },
    include: {
      ingredientType: true,
    },
  });

  const returnIngredient = convertToReturnIngredient(ingredient);
  return res.json({ ingredient: returnIngredient });
};

const updateIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { ingredientId },
    body: { displayUnit, displayAmount },
  } = await parseRequest(updateIngredientSchema, req);

  const ingredient = await prisma.ingredient.findUniqueOrThrow({
    where: { id: ingredientId },
    include: {
      ingredientType: true,
    },
  });

  const updateData : Prisma.IngredientUncheckedUpdateInput = {};

  // Update the amount of ingredient if data is provided
  if (displayAmount && displayUnit) {
    updateData.amount = convertToBaseAmount(
      displayAmount,
      ingredient.ingredientType.measurementType,
      displayUnit,
    );
    updateData.displayUnit = displayUnit;
  }

  const updatedIngredient = await prisma.ingredient.update({
    where: {
      id: ingredientId,
    },
    data: updateData,
    include: {
      ingredientType: true,
    },
  });

  const returnIngredient = convertToReturnIngredient(updatedIngredient);
  return res.status(200).json({ ingredient: returnIngredient });
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
