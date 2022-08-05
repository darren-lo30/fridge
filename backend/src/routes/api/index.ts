import express from 'express';

import { withAuth } from '@src/middleware/restrictionMiddleware';
import userRouter from './users';
import authRouter from './auth';
import fridgeRouter from './fridge';

// 123123
const router = express.Router();

router.use('/', authRouter);
router.use('/users/:userId/fridge', withAuth, fridgeRouter);
router.use('/users', withAuth, userRouter);

export default router;
