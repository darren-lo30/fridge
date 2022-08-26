import {IngredientType} from "./IngredientType"

export interface Ingredient {
  id: string,
  ingredientType: IngredientType;
  amount: number,
  displayAmount: number,
  displayUnit: string,
  lastUpdated: Date
}

export interface ResponseWithIngredient {
  ingredient: Ingredient,
}

export interface RepsonseWithIngredients {
  ingredients: Ingredient[]
}
