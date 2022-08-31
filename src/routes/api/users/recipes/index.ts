import { indexUserRecipes } from '@src/controllers/recipesController';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.get('/', indexUserRecipes);

export default router;
