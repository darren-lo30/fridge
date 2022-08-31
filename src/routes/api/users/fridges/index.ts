import express from 'express';

import { getUserFridge } from '@controllers/fridgesController';

const router = express.Router({ mergeParams: true });
router.get('/', getUserFridge);
export default router;
