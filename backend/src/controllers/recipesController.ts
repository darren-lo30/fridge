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
  // First finds the user's fridge to look for all the ingredients that they have
  const fridge = await prisma.fridge.findFirstOrThrow({
    where: {
      userId: currentUser.id,
    },
    include: {
      ingredients: true,
    },
  });

  const findManyAndConditions : Prisma.IngredientWhereInput[] = [];
  /*
  Then creates an array of conditions that will be chained together checking that every
  ingredient of the fridge has the following. The ingredient of the recipe must have an
  ingredientTypeId matching one of the ones seen in the user's fridge (OR chain)
  while also having an amount less than or equal to the amount of that same ingredient
  in the user's fridge. This ensures the user has enough of the ingredient to cook the recipe
  */
  fridge.ingredients.forEach((ingredient) => {
    findManyAndConditions.push({
      // Both the same ingredient and the one in the recipe is less than or equal
      // to the ingredient in the fridge
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
        // Runs the condition that every ingredient in the recipe exists in user's fridge and
        // requires amount less than user has
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
    include: {
      author: true,
    },
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
      author: true,
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
  const {
    body: {
      instructions, title, description, thumbnail,
    },
  } = await parseRequest(createRecipeSchema, req);

  const recipe = await prisma.recipe.create({
    data: {
      authorId: req.user.id,
      description,
      instructions,
      thumbnail,
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
