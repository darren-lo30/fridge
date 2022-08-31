import { withFridgeOwnership } from '@src/middleware/restrictionMiddleware';
import express from 'express';

import ingredientsRouter from './ingredients';

const router = express.Router();

router.use('/:fridgeId/ingredients', withFridgeOwnership, ingredientsRouter);
export default router;
