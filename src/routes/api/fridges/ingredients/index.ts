import express from 'express';

import { createFridgeIngredient, indexFridgeIngredients } from '@controllers/ingredientsController';

const router = express.Router({ mergeParams: true });
router.post('/', createFridgeIngredient);
router.get('/', indexFridgeIngredients);

export default router;
