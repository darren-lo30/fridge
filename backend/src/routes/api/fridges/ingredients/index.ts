import express from 'express';

import { createIngredient } from '@controllers/ingredientsController';

const router = express.Router({ mergeParams: true });
router.post('/', createIngredient);

export default router;
