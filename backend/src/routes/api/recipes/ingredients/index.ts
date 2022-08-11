import { createRecipeIngredient } from '@src/controllers/ingredientsController';
import express from 'express';

const router = express.Router();
router.post('/', createRecipeIngredient);
export default router;
