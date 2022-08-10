import { ApplicationError } from '@src/middleware/errorHandler';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { getRecipeSchema } from '@src/validators/recipesValidator';
import express from 'express';

const indexRecipes = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

};

const getRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { recipeId } } = await parseRequest(getRecipeSchema, req);

  try {
    const recipe = await prisma.recipe.findUniqueOrThrow({
      where: {
        id: recipeId,
      },
    });

    return res.json({ recipe });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

const createRecipe = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

};

const updateRecipe = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
};

export {
  indexRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
};
