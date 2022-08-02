import express from 'express';

import {
  createUser,
  getUser,
  indexUsers,
} from '@controllers/users';

const router = express.Router();

// Creates a user, used in the sign up process
router.post('/', createUser);
router.get('/', indexUsers);
router.get('/:id', getUser);

export default router;
