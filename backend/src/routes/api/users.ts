import express from 'express';

import {
  getUser,
  indexUsers,
} from '@controllers/users';

const router = express.Router();

router.get('/', indexUsers);
router.get('/:id', getUser);

export default router;
