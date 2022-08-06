/* eslint-disable import/prefer-default-export */
import { Schema } from 'express-validator';

const createIngredientSchema: Schema = {
  ingredientTypeId: {
    isString: true,
    exists: true,
  },
  amount: {
    isDecimal: true,
    exists: true,
    toFloat: true,
  },
};

const updateIngredientSchema: Schema = {
  amount: {
    isDecimal: true,
    optional: true,
  },
};

export {
  updateIngredientSchema,
  createIngredientSchema,
};
