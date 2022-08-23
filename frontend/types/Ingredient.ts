import {IngredientType} from "./IngredientType"

export interface Ingredient {
  id: string,
  ingredientType: IngredientType;
  amount: number,
  displayAmount: number
}


export interface RepsonseWithIngredients {
  ingredients: Ingredient[]
}
// id                String          @id @default(uuid())
// ingredientTypeId  String
// ingredientType    IngredientType  @relation(fields: [ingredientTypeId], references: [id])
// fridgeId          String?
// fridge            Fridge?         @relation(fields: [fridgeId], references: [id])
// recipeId          String?
// recipe            Recipe?         @relation(fields: [recipeId], references: [id])
// amount            Decimal
// measurementUnitId String
// measurementUnit   MeasurementUnit @relation(fields: [measurementUnitId], references: [id])
