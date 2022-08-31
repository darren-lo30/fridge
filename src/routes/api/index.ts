import express from 'express';

import { withAuth } from '@src/middleware/restrictionMiddleware';
import usersRouter from './users';
import authRouter from './auth';
import fridgesRouter from './fridges';
import recipesRouter from './recipes';
import ingredientsRouter from './ingredients';
import ingredientTypesRouter from './ingredientTypes';
import measurementUnitsRouter from './measurementUnits';

const router = express.Router();

router.use('/', authRouter);
router.use('/users', withAuth, usersRouter);
router.use('/fridges', withAuth, fridgesRouter);
router.use('/recipes', withAuth, recipesRouter);
router.use('/ingredients', withAuth, ingredientsRouter);
router.use('/ingredientTypes', withAuth, ingredientTypesRouter);
router.use('/measurementUnits', measurementUnitsRouter);
export default router;
