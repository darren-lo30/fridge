import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { ResponseWithRecipes, ResponseWithRecipe } from "@fridgeTypes/Recipe";
import { AxiosRequestConfig } from "axios";

interface RecipeUpdateData {
  title?: string,
  description?: string,
  instructions?: string,
  published?: boolean,
  thumbnail?: string,
}

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
  createDraftRecipe: async function(axiosConfig: AxiosRequestConfig) {
    const response = await api.post<ResponseWithRecipe>(`recipes`, { published: false }, axiosConfig);
    return response.data.recipe;
  },
  updateRecipe: async function(recipeId: string, data: RecipeUpdateData) {
    const response = await api.patch<ResponseWithRecipe>(`recipes/${recipeId}`, data);
    return response.data.recipe;
  },
  deleteRecipe: async function(recipeId: string) {
    await api.delete(`recipes/${recipeId}`);
  },

}

export default RecipeAPI;