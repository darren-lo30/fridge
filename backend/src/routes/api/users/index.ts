import express from 'express';

import {
  getUser,
} from '@controllers/usersController';

import { withOwnership } from '@src/middleware/restrictionMiddleware';
import fridgesRouter from './fridges';

const router = express.Router();

router.get('/:userId', getUser);

router.use('/:userId/fridges', withOwnership, fridgesRouter);

export default router;
