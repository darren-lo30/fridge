import prisma from '@src/prisma';
import {
  assertIsAuthed, assertExists,
} from '@src/utils/assertions';
import express from 'express';
import { ApplicationError } from './errorHandler';

const withAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (!req.user) {
    return next(new ApplicationError(401, 'The current user is unauthorized.'));
  }

  return next();
};

const withOwnership = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  assertExists(req.params.userId);

  if (!req.user || req.user.id !== req.params.userId) {
    return next(new ApplicationError(401, 'The current user does not have ownership of this resource.'));
  }

  return next();
};

const withResourceOwnership = (
  getOwnerId : (req: express.Request) => Promise<string | undefined | null>,
) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const { user } = req;

  // @ts-ignore
  try {
    const ownerId = await getOwnerId(req);

    if (ownerId === undefined || ownerId === null || ownerId !== user.id) {
      return next(new ApplicationError(401, 'The current user does not have ownership of this resource.'));
    }
  } catch (e) {
    if (e instanceof ApplicationError) {
      next(e);
    } else {
      throw e;
    }
  }

  return next();
};

const withIngredientOwnership = withResourceOwnership(async (req) => {
  assertExists(req.params.ingredientId);

  const ingredient = await prisma.ingredient.findUnique({
    where: { id: req.params.ingredientId },
  });

  if (!ingredient) return undefined;

  if (ingredient.fridgeId) {
    const fridge = await prisma.fridge.findUnique({
      where: { id: ingredient.fridgeId },
    });

    return fridge?.userId;
  } if (ingredient.recipeId) {
    const recipe = await prisma.recipe.findUnique({
      where: { id: ingredient.recipeId },
    });

    return recipe?.authorId;
  }

  return undefined;
});

const withRecipeOwnership = withResourceOwnership(async (req) => {
  assertExists(req.params.recipeId);

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: req.params.recipeId,
    },
  });

  return recipe?.authorId;
});

const withFridgeOwnership = withResourceOwnership(async (req) => {
  assertExists(req.params.fridgeId);

  const recipe = await prisma.fridge.findUnique({
    where: {
      id: req.params.fridgeId,
    },
  });

  return recipe?.userId;
});

// eslint-disable-next-line import/prefer-default-export
export {
  withAuth, withOwnership, withRecipeOwnership, withFridgeOwnership, withIngredientOwnership,
};
