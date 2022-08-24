export type MeasurementType = 'discrete_cnt' | 'volume_mL' | 'weight_g';

export interface MeasurementUnit {
  id: string,
  unitName: string,
  measurementType: MeasurementType,
}

export interface ResponseWithMeasurementUnits {
  measurementUnits: MeasurementUnit[],
} 
