import { MeasurementType } from "./MeasurementUnits";

export interface IngredientType {
  id: string,
  name: string,
  measurementType: MeasurementType,
}

export interface ResponseWithIngredientTypes {
  ingredientTypes: IngredientType[],
}