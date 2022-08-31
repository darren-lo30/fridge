import { indexMeasurementUnits } from '@src/controllers/measurementUnitsController';
import express from 'express';

const router = express.Router();

router.get('/', indexMeasurementUnits);

export default router;
