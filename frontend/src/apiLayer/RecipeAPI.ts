import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { ResponseWithRecipes, ResponseWithRecipe } from "@fridgeTypes/Recipe";
import { AxiosRequestConfig } from "axios";

const RecipeAPI = {
  indexTailoredRecipes: async function (options : PaginationParams) {    
    options.limit = options.limit || 10;
    
    const response = await api.get<ResponseWithRecipes>('/recipes', { params : {...options, show: 'tailored'}});
    return response.data.recipes;
  },

  indexAllRecipes: async function (options : PaginationParams) {
    const response = await api.get<ResponseWithRecipes>(`/recipes`, { params : {...options, show: 'all'}});
    return response.data.recipes;
  },
  indexUserRecipes: async function (userId: string, options: PaginationParams) {
    const response = await api.get<ResponseWithRecipes>(`/users/${userId}/recipes`, { params : {...options }});
    return response.data.recipes;
  },
  showRecipe: async function (recipeId: string, axiosConfig: AxiosRequestConfig ) {
    const response = await api.get<ResponseWithRecipe>(`/recipes/${recipeId}`, axiosConfig);
    return response.data.recipe;
  },

}

export default RecipeAPI;