import { indexIngredientTypes } from '@src/controllers/ingredientTypesController';
import express from 'express';

const router = express.Router();

router.get('/', indexIngredientTypes);

export default router;
