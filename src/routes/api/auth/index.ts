import express from 'express';

import {
  getAuthedUser, signIn, signUp, signOut,
} from '@controllers/usersController';

const router = express.Router();
router.post('/sign-in', signIn);
router.post('/sign-up', signUp);
router.post('/auth', getAuthedUser);
router.post('/sign-out', signOut);
export default router;
