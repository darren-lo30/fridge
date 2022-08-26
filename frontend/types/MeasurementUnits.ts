export type MeasurementType = 'discrete_cnt' | 'volume_mL' | 'weight_g';

export interface ResponseWithMeasurementUnits {
  measurementUnits: {
    discrete_cnt: Array<string>,
    volume_mL: Array<string>,
    weight_g: Array<string>,
  }
}