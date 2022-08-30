import api from "@configs/axiosConfig";
import { PaginationParams, SearchParams } from "@fridgeTypes/API";
import { RepsonseWithIngredients, ResponseWithIngredient } from "@fridgeTypes/Ingredient";

export interface IngredientCreationData {
  displayAmount: number, 
  displayUnit: string
  ingredientTypeId: string,
}

export interface IngredientUpdateData {
  displayAmount?: number, 
  displayUnit?: string,
}

const IngredientAPI = {
  indexFridgeIngredients: async function (fridgeId: string, options: PaginationParams & SearchParams) {
    const response = await api.get<RepsonseWithIngredients>(`/fridges/${fridgeId}/ingredients`, { params: options });
    return response.data.ingredients;
  },
  createFridgeIngredient: async function(fridgeId: string, createData: IngredientCreationData) {
    const response = await api.post<ResponseWithIngredient>(`/fridges/${fridgeId}/ingredients`, {
      ...createData,
    });

    return response.data.ingredient;
  },
  createRecipeIngredient: async function(recipeId: string, createData: IngredientCreationData) {
    const response = await api.post<ResponseWithIngredient>(`/recipes/${recipeId}/ingredients`, {
      ...createData,
    });

    return response.data.ingredient;
  },
  updateIngredient: async function(ingredientId: string, updateData: IngredientUpdateData) {
    const response = await api.patch<ResponseWithIngredient>(`/ingredients/${ingredientId}`, {
      ...updateData,
    })

    return response.data.ingredient;
  },
  deleteIngredient: async function(ingredientId: string) {
    await api.delete(`/ingredients/${ingredientId}`);
  }
}

export default IngredientAPI;