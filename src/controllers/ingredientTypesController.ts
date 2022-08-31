import { Prisma } from '@prisma/client';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { assertIsAuthed } from '@src/utils/assertions';
import { indexIngredientTypesSchema } from '@src/validators/ingredientTypesValidator';
import express from 'express';

const indexIngredientTypes = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const {
    query: {
      cursor, limit, offset, show, search,
    },
  } = await parseRequest(indexIngredientTypesSchema, req);

  const indexArgs : Prisma.IngredientTypeFindManyArgs = {
    take: limit,
    skip: offset,
    cursor: cursor ? { id: cursor } : undefined,
  };

  if (show === 'tailored') {
    // First finds all ingredients the user already hasw with their ingredientTypeId
    const userIngredients = await prisma.ingredient.findMany({
      where: {
        fridge: {
          userId: {
            equals: req.user.id,
          },
        },
      },
      select: {
        ingredientTypeId: true,
      },
    });

    // Finds all ingredient types that the user does not currently have in their fridge
    const existingIngredientTypes = userIngredients.map((i) => i.ingredientTypeId);
    indexArgs.where = {
      ...indexArgs.where,
      id: {
        notIn: existingIngredientTypes,
      },
    };
  }

  if (search) {
    indexArgs.where = {
      ...indexArgs.where,
      name: {
        contains: search,
      },
    };
  }

  const ingredientTypes = await prisma.ingredientType.findMany(indexArgs);

  return res.json({ ingredientTypes });
};

export {
  indexIngredientTypes,
};
