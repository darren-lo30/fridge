import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { RepsonseWithIngredients, ResponseWithIngredient } from "@fridgeTypes/Ingredient";

const IngredientAPI = {
  indexFridgeIngredients: async function (fridgeId: string, options: PaginationParams) {
    const response = await api.get<RepsonseWithIngredients>(`/fridges/${fridgeId}/ingredients`, { params: { ...options }});
    return response.data.ingredients;
  },
  createIngredient: async function(fridgeId: string, ingredientTypeId: string, displayAmount: number, displayUnit: string) {
    const response = await api.post<ResponseWithIngredient>(`/fridges/${fridgeId}/ingredients`, {
      ingredientTypeId,
      displayAmount,
      displayUnit,
    });

    return response.data.ingredient;
  },
  deleteIngredient: async function(ingredientId: string) {
    await api.delete(`/ingredients/${ingredientId}`);
  }
}

export default IngredientAPI;