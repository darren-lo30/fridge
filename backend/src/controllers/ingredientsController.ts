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
    assertExists<string>(req.params.userId);

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

    const { ingredientTypeId, amount } = req.body;

    try {
      const ingredient = await prisma.ingredient.create({
        data: {
          fridgeId: fridge.id,
          ingredientTypeId,
          amount,
        },
      });

      return res.json({ ingredient });
    } catch (e) {
      return next(new ApplicationError(400, 'Bad request payload.'));
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
    const { amount } : Prisma.IngredientUpdateInput = (req.body);

    try {
      const ingredient = await prisma.ingredient.update({
        where: {
          id: ingredientId,
        },
        data: {
          amount,
        },
      });

      return res.status(200).json({ ingredient });
    } catch (e) {
      return res.status(404).json({ message: 'Ingredient could not be found.' });
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
    } catch (e) {
      return next(new ApplicationError(404, 'Ingredient could not be found.'));
    }
  }];

export {
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
