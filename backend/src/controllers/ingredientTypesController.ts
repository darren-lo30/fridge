import { Prisma } from '@prisma/client';
import { ApplicationError } from '@src/middleware/errorHandler';
import prisma from '@src/prisma';
import express from 'express';

const indexIngredientTypes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const findManyArgs : Prisma.IngredientTypeFindManyArgs = {};

  if (req.query.limit && typeof req.query.limit === 'string') {
    if (Number.isNaN(req.query.offset)) return next(new ApplicationError(400, 'The limit must be an integer.'));
    findManyArgs.take = Number.parseInt(req.query.limit, 10);
  }

  if (req.query.offset && typeof req.query.offset === 'string') {
    if (Number.isNaN(req.query.offset)) return next(new ApplicationError(400, 'The offset must be an integer.'));
    findManyArgs.skip = Number.parseInt(req.query.offset, 10);
  } else if (req.query.cursor && typeof req.query.cursor === 'string') {
    findManyArgs.cursor = { id: req.query.cursor };
    findManyArgs.skip = 1;
  }

  try {
    const ingredientTypes = await prisma.ingredientType.findMany(findManyArgs);
    return res.json({ ingredientTypes });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

export {
  indexIngredientTypes,
};
