import { Prisma } from '@prisma/client';
import { ApplicationError } from '@src/middleware/errorHandler';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import paginatedIndexSchema from '@src/validators/shared/paginatedQueryValidator';
import express from 'express';

const indexIngredientTypes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const findManyArgs : Prisma.IngredientTypeFindManyArgs = {};

  const { query: { cursor, limit, offset } } = await parseRequest(paginatedIndexSchema, req);
  if (limit) {
    findManyArgs.take = limit;
  }

  if (offset) {
    findManyArgs.skip = offset;
  } else if (cursor) {
    findManyArgs.cursor = { id: cursor };
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
