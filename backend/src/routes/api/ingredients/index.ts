import express from 'express';

import { deleteIngredient, updateIngredient } from '@controllers/ingredientsController';
import { withIngredientOwnership } from '@src/middleware/restrictionMiddleware';

const router = express.Router({ mergeParams: true });

router.patch('/:ingredientId', withIngredientOwnership, updateIngredient);
router.delete('/:ingredientId', withIngredientOwnership, deleteIngredient);

export default router;
