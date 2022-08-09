import { ApplicationError } from '@src/middleware/errorHandler';
import prisma from '@src/prisma';
import express from 'express';

const indexMeasurementUnits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const measurementUnits = await prisma.measurementUnit.findMany({ });

    return res.json({ measurementUnits });
  } catch (err) {
    return next(ApplicationError.constructFromDbError(err));
  }
};

export {
  indexMeasurementUnits,
};
