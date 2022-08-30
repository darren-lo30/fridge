import { Ingredient } from "./Ingredient";
import { User } from "./User";

export interface Recipe {
  id: string,
  thumbnail: string,
  author: User,
  title: string,
  description: string,
  instructions: JSON,
  postedDate: Date,
  ingredients: Array<Ingredient>,
  published: boolean,
}

export interface ResponseWithRecipe {
  recipe: Recipe
}

export interface ResponseWithRecipes {
  recipes: Recipe[],
}
