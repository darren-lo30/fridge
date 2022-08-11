import express from 'express';

import { createFridgeIngredient } from '@controllers/ingredientsController';

const router = express.Router({ mergeParams: true });
router.post('/', createFridgeIngredient);

export default router;
