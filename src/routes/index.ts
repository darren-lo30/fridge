import express from 'express';
import apiRouter from '@routes/api';

const router = express.Router();

router.use('/api', apiRouter);

export default router;
