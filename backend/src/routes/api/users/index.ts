import express from 'express';

import {
  getUser,
} from '@controllers/usersController';

import { withOwnership } from '@src/middleware/restrictionMiddleware';
import fridgesRouter from './fridges';
import recipesRouter from './recipes';

const router = express.Router();

router.get('/:userId', getUser);

router.use('/:userId/fridges', withOwnership, fridgesRouter);
router.use('/:authorId/recipes', recipesRouter);
export default router;
