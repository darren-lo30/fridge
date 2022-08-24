import { MeasurementType } from '@prisma/client';
import { z } from 'zod';

const measurementType = z.enum<string, any>(Object.keys(MeasurementType));
const indexMeasurementUnitsSchema = z.object({
  query: z.object({
    measurementType: measurementType.optional(),
  }),
});

export {
  indexMeasurementUnitsSchema,
};
