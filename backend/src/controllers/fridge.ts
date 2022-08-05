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
  try {
    const fridge = await prisma.fridge.findUnique({
      where: {
        userId: req.params.userId,
      },
    });

    return res.json({ fridge });
  } catch (e) {
    return next(new ApplicationError(404, 'Fridge could not be found.'));
  }
};

const updateFridge = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {

};

export {
  getFridge,
  updateFridge,
};
