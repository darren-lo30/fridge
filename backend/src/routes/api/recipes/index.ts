import express from 'express';

import {
  getRecipe, indexRecipes, createRecipe, updateRecipe, deleteRecipe,
} from '@controllers/recipesController';

import { withRecipeOwnership } from '@src/middleware/restrictionMiddleware';
import ingredientsRouter from './ingredients';

const router = express.Router({ mergeParams: true });

router.get('/:recipeId', withRecipeOwnership, getRecipe);
router.patch('/:recipeId', withRecipeOwnership, updateRecipe);
router.delete('/:recipeId', withRecipeOwnership, deleteRecipe);
router.post('/', createRecipe);
router.get('/', indexRecipes);

router.use('/:recipeId/ingredients', withRecipeOwnership, ingredientsRouter);

export default router;
