import { Prisma } from '@prisma/client';
import { ApplicationError } from '@src/middleware/errorHandler';
import validateAndSantizeRequest from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { assertExists } from '@src/utils/assertions';
import { createIngredientSchema, updateIngredientSchema } from '@src/validators/ingredientsValidator';
import express from 'express';

const createIngredient = [
  validateAndSantizeRequest(createIngredientSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    assertExists<string>(req.params.fridgeId);

    const fridge = await prisma.fridge.findUnique({
      where: {
        id: req.params.fridgeId,
      },
    });

    if (!fridge) {
      return next(new ApplicationError(404, 'Fridge could not be found.'));
    }

    const { ingredientTypeId, amount, measurementUnitId } = req.body;

    try {
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
  }];

const updateIngredient = [
  validateAndSantizeRequest(updateIngredientSchema),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    assertExists(req.params.ingredientId);

    const { ingredientId } = req.params;
    const { amount, measurementUnitId } : Prisma.IngredientUncheckedUpdateInput = (req.body);

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
  }];

const deleteIngredient = [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    assertExists(req.params.ingredientId);

    const { ingredientId } = req.params;
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
