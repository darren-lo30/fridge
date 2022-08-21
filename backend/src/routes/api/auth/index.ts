import express from 'express';

import { getAuthedUser, signIn, signUp } from '@controllers/usersController';

const router = express.Router();
router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/auth', getAuthedUser);

export default router;
