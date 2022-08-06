import express from 'express';

import {
  getRecipe, indexRecipes, createRecipe, updateRecipe,
} from '@controllers/recipesController';

const router = express.Router({ mergeParams: true });

router.post('/:recipeId', getRecipe);
router.patch('/:recipeId', updateRecipe);
router.post('/', createRecipe);
router.get('/', indexRecipes);

export default router;
