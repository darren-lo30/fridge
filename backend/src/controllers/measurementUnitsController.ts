import prisma from '@src/prisma';
import express from 'express';

const indexMeasurementUnits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const measurementUnits = await prisma.measurementUnit.findMany({});

  return res.json({ measurementUnits });
};

export {
  indexMeasurementUnits,
};
