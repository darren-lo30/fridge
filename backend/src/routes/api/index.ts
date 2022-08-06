import express from 'express';

import { withAuth, withOwnership, withRecipeOwnership } from '@src/middleware/restrictionMiddleware';
import usersRouter from './users';
import authRouter from './auth';
import fridgesRouter from './fridges';
import recipesRouter from './recipes';
import ingredientsRouter from './ingredients';

const router = express.Router();

router.use('/', authRouter);
router.use('/users/:userId/fridges', withAuth, fridgesRouter);
router.use('/users/:userId/fridges/ingredients', withAuth, withOwnership, ingredientsRouter);
router.use('/users', withAuth, usersRouter);

router.use('/recipes', recipesRouter);
router.use('/recipes/:recipeId/ingredients', withAuth, withRecipeOwnership, ingredientsRouter);

export default router;
