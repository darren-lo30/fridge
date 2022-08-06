import express from 'express';

import { getFridge } from '@controllers/fridgesController';
import { withOwnership } from '@src/middleware/restrictionMiddleware';

const router = express.Router({ mergeParams: true });
router.get('/', withOwnership, getFridge);
export default router;
