import { Recipe } from '@prisma/client';
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
    return next(new ApplicationError(401, 'User is unauthorized.'));
  }

  return next();
};

const withOwnership = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  assertExists<string>(req.params.userId);

  if (!req.user || req.user.id !== req.params.userId) {
    return next(new ApplicationError(401, 'User does not have ownership of this resource.'));
  }

  return next();
};

const withRecipeOwnership = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  assertExists<Recipe>(res.locals.recipe);

  const { recipe } = res.locals;
  const { user } = req;

  if (recipe.id !== user.id) {
    next(new ApplicationError(401, 'Unauthorized request.'));
  }

  next();
};
// eslint-disable-next-line import/prefer-default-export
export { withAuth, withOwnership, withRecipeOwnership };
