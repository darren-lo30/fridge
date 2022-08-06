import prisma from '@src/prisma';
import express from 'express';
import { assertIsAuthed } from '@src/utils/assertions';
import { ApplicationError } from '@src/middleware/errorHandler';
import { Schema } from 'express-validator';
import validateAndSantizeRequest from '@src/middleware/requestValidator';
import { Prisma } from '@prisma/client';

const getFridge = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);
  const fridge = await prisma.fridge.findUnique({
    where: {
      userId: req.params.userId,
    },
    include: {
      ingredients: true,
    },
  });

  if (!fridge) {
    return next(new ApplicationError(404, 'Fridge could not be found.'));
  }

  return res.json({ fridge });
};

const updateFridgeSchema: Schema = {
  ingredients: {
    isArray: true,
    toArray: true,
  },
  'ingredients.*.ingredientTypeId': {
    isString: true,
    exists: true,
  },
  'ingredients.*.measurementType': {
    isIn: {
      options: ['discrete', 'volume', 'weight'],
    },
    exists: true,
  },
  'ingredients.*.amount': {
    isDecimal: true,
    exists: true,
  },
};

const updateFridge = [
  validateAndSantizeRequest(updateFridgeSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // Retrieves fridge that is currently being queried to ensure that it exists and to find its id
    const fridge = await prisma.fridge.findUnique({
      where: {
        userId: req.params.userId,
      },
    });

    if (!fridge) {
      return next(new ApplicationError(404, 'Fridge could not be found.'));
    }

    const { ingredients } = req.body;
    try {
      await prisma.$transaction(
        ingredients.map((
          data : Prisma.IngredientUncheckedCreateWithoutFridgeInput,
        ) => prisma.ingredient.upsert(
          {
            where: {
              ingredientTypeId_fridgeId: {
                ingredientTypeId: data.ingredientTypeId,
                fridgeId: fridge.id,
              },
            },
            create: {
              ...data,
              fridgeId: fridge.id,
            },
            update: {
              ...data,
            },
          },
        )),
      );
    } catch (e) {
      return next(new ApplicationError(400, 'Bad request payload.'));
    }

    return res.sendStatus(200);
  }];

export {
  getFridge,
  updateFridge,
};
