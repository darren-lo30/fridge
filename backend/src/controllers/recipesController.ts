import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { Prisma, User } from '@prisma/client';
import { assertIsAuthed } from '@src/utils/assertions';
import {
  createRecipeSchema,
  deleteRecipeSchema,
  getRecipeSchema,
  indexRecipesSchema,
  indexUserRecipesSchema,
  updateRecipeSchema,
} from '@src/validators/recipesValidator';
import express from 'express';

const indexTailoredRecipes = async (indexArgs : Prisma.RecipeFindManyArgs, currentUser: User) => {
  const fridge = await prisma.fridge.findFirstOrThrow({
    where: {
      userId: currentUser.id,
    },
    include: {
      ingredients: true,
    },
  });

  const findManyAndConditions : Prisma.IngredientWhereInput[] = [];
  fridge.ingredients.forEach((ingredient) => {
    findManyAndConditions.push({
      AND: [{
        ingredientTypeId: {
          equals: ingredient.ingredientTypeId,
        },
        amount: {
          lte: ingredient.amount,
        },
      }],
    });
  });

  const recipes = await prisma.recipe.findMany({
    ...indexArgs,
    where: {
      ingredients: {
        every: {
          OR: findManyAndConditions,
        },
      },
    },
  });

  return recipes;
};

const indexUserRecipes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { authorId },
    query: { cursor, limit, offset },
  } = await parseRequest(indexUserRecipesSchema, req);

  const recipes = await prisma.recipe.findMany({
    where: {
      authorId,
    },
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
  });

  return res.json({ recipes });
};

const indexRecipes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const {
    query: {
      cursor, limit, offset, show,
    },
  } = await parseRequest(indexRecipesSchema, req);

  const indexArgs : Prisma.RecipeFindManyArgs = {
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      ingredients: true,
    },
  };

  let recipes;
  if (show === 'all') {
    recipes = await prisma.recipe.findMany(indexArgs);
  } else if (show === 'tailored') {
    recipes = await indexTailoredRecipes(indexArgs, req.user!);
  }

  return res.json({ recipes });
};

const getRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { recipeId } } = await parseRequest(getRecipeSchema, req);

  const recipe = await prisma.recipe.findUniqueOrThrow({
    where: {
      id: recipeId,
    },
    include: {
      ingredients: true,
    },
  });

  return res.json({ recipe });
};

const createRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const { body: { instructions, title } } = await parseRequest(createRecipeSchema, req);

  const recipe = await prisma.recipe.create({
    data: {
      authorId: req.user.id,
      instructions,
      title,
    },
  });

  return res.json({ recipe });
};

const updateRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    body: { instructions, title },
    params: { recipeId },
  } = await parseRequest(updateRecipeSchema, req);

  const recipe = await prisma.recipe.update({
    where: {
      id: recipeId,
    },
    data: {
      instructions,
      title,
    },
  });

  return res.json({ recipe });
};

const deleteRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { recipeId } } = await parseRequest(deleteRecipeSchema, req);
  await prisma.recipe.delete({
    where: {
      id: recipeId,
    },
  });

  return res.sendStatus(200);
};
export {
  indexRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  indexUserRecipes,
  deleteRecipe,
};
