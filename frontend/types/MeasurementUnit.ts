export type MeasurementType = 'discrete_no' | 'volume_mL' | 'weight_g';

export interface MeasurementUnitOptions {
  discrete_no: Array<string>,
  volume_mL: Array<string>,
  weight_g: Array<string>
}

export interface ResponseWithMeasurementUnits {
  measurementUnits: MeasurementUnitOptions,
}