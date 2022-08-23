import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { getUserFridgeSchema } from '@src/validators/fridgesValidator';
import express from 'express';

const getUserFridge = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { params: { userId } } = await parseRequest(getUserFridgeSchema, req);

  const fridge = await prisma.fridge.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  return res.json({ fridge });
};

export {
  getUserFridge,
};
