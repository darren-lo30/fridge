import express from 'express';

import { createIngredient, deleteIngredient, updateIngredient } from '@controllers/ingredientsController';

const router = express.Router({ mergeParams: true });
router.post('/', createIngredient);
router.patch('/:ingredientId', updateIngredient);
router.delete('/:ingredientId', deleteIngredient);

export default router;
