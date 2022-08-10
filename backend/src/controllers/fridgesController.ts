import prisma from '@src/prisma';
import express from 'express';
import { ApplicationError } from '@src/middleware/errorHandler';

const getUserFridge = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const fridge = await prisma.fridge.findUniqueOrThrow({
      where: {
        userId: req.params.userId,
      },
      include: {
        ingredients: true,
      },
    });
    return res.json({ fridge });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

export {
  // getFridge,
  getUserFridge,
};
