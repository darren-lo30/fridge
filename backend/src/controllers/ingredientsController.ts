import { ApplicationError } from '@src/middleware/errorHandler';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { createIngredientSchema, deleteIngredientSchema, updateIngredientSchema } from '@src/validators/ingredientsValidator';
import express from 'express';

const createIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: {
      fridgeId,
    },
    body:
    {
      amount,
      ingredientTypeId,
      measurementUnitId,
    },
  } = await parseRequest(createIngredientSchema, req);

  try {
    const fridge = await prisma.fridge.findUniqueOrThrow({
      where: {
        id: fridgeId,
      },
    });

    const ingredient = await prisma.ingredient.create({
      data: {
        fridgeId: fridge.id,
        ingredientTypeId,
        amount,
        measurementUnitId,
      },
    });

    return res.json({ ingredient });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

const updateIngredient = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const {
    params: { ingredientId },
    body: { amount, measurementUnitId },
  } = await parseRequest(updateIngredientSchema, req);

  try {
    const ingredient = await prisma.ingredient.update({
      where: {
        id: ingredientId,
      },
      data: {
        amount,
        measurementUnitId,
      },
    });

    return res.status(200).json({ ingredient });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

const deleteIngredient = [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { params: { ingredientId } } = await parseRequest(deleteIngredientSchema, req);

    try {
      await prisma.ingredient.delete({
        where: {
          id: ingredientId,
        },
      });

      return res.status(200).json({ message: 'Ingredient was successfully deleted' });
    } catch (err) {
      return next(ApplicationError.constructFromDbError(err));
    }
  }];

export {
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
