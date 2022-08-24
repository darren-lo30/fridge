import { MeasurementType } from "./MeasurementUnit";

export interface IngredientType {
  id: string,
  name: string,
  measurementType: MeasurementType,
}

export interface ResponseWithIngredientTypes {
  ingredientTypes: IngredientType[],
}