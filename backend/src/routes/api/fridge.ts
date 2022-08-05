import express from 'express';

import { getFridge, updateFridge } from '@controllers/fridge';
import { withOwnership } from '@src/middleware/restrictionMiddleware';

const router = express.Router({ mergeParams: true });
router.get('/', getFridge);
router.patch('/', withOwnership, updateFridge);
export default router;
