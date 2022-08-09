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

  const { limit, cursor, offset } = req.query;

  if (limit && typeof limit === 'string') {
    const parsedLimit = parseInt(limit, 10);
    if (Number.isNaN(parsedLimit) || parsedLimit < 0) return next(new ApplicationError(400, 'The limit must be a positive integer.'));
    findManyArgs.take = parseInt(limit, 10);
  }

  if (offset && typeof offset === 'string') {
    const parsedOffset = parseInt(offset, 10);
    if (Number.isNaN(parsedOffset) || parsedOffset < 0) return next(new ApplicationError(400, 'The offset must be a positive integer.'));
    findManyArgs.skip = parsedOffset;
  } else if (cursor && typeof cursor === 'string') {
    findManyArgs.cursor = { id: cursor };
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
