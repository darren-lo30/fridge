import { Prisma } from '@prisma/client';
import { parseRequest } from '@src/middleware/requestValidator';
import prisma from '@src/prisma';
import { indexMeasurementUnitsSchema } from '@src/validators/measurementUnitsValidator';
import express from 'express';

const indexMeasurementUnits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { query: { measurementType } } = await parseRequest(indexMeasurementUnitsSchema, req);
  const indexArgs : Prisma.MeasurementUnitFindManyArgs = {};

  if (measurementType) {
    indexArgs.where = {
      measurementType: {
        equals: measurementType,
      },
    };
  }

  const measurementUnits = await prisma.measurementUnit.findMany(indexArgs);

  return res.json({ measurementUnits });
};

export {
  indexMeasurementUnits,
};
