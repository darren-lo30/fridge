import express from 'express';
import { convert } from '@utils/unitConversions';

const indexMeasurementUnits = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => res.json({
  measurementUnits: {
    discrete_no: ['no'],
    volume_mL: convert().from('ml').possibilities(),
    weight_g: convert().from('g').possibilities(),
  },
});

export {
  indexMeasurementUnits,
};
