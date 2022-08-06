import prisma from '@src/prisma';
import express from 'express';
import { assertIsAuthed } from '@src/utils/assertions';
import { ApplicationError } from '@src/middleware/errorHandler';

const getFridge = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  assertIsAuthed(req);

  // Finds the fridge belonging to the user indicated in the URL
  const fridge = await prisma.fridge.findUnique({
    where: {
      userId: req.params.userId,
    },
    include: {
      ingredients: true,
    },
  });

  if (!fridge) {
    return next(new ApplicationError(404, 'Fridge could not be found.'));
  }

  return res.json({ fridge });
};

export {
  getFridge,
};
