import { User } from "./User";

export interface Recipe {
  id: string,
  thumbnail: string,
  author: User,
  title: string,
  description: string,
  instructions: string,
  postedDate: Date,
  ingredients: Array<object>
}

export interface ResponseWithRecipe {
  recipe: Recipe
}

export interface ResponseWithRecipes {
  recipes: Recipe[],
}
