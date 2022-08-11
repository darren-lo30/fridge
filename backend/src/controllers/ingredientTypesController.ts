import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { indexIngredientTypesSchema } from '@src/validators/ingredientTypesValidator';
import express from 'express';

const indexIngredientTypes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { query: { cursor, limit, offset } } = await parseRequest(indexIngredientTypesSchema, req);

  const ingredientTypes = await prisma.ingredientType.findMany({
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
  });
  return res.json({ ingredientTypes });
};

export {
  indexIngredientTypes,
};
