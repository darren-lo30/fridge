import express from 'express';

import userRouter from './users';
import authRouter from './auth';

// 123123
const router = express.Router();

router.use('/', authRouter);
router.use('/users', userRouter);

export default router;
