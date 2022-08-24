import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { RepsonseWithIngredients, ResponseWithIngredient } from "@fridgeTypes/Ingredient";

const IngredientAPI = {
  indexFridgeIngredients: async function (fridgeId: string, options: PaginationParams) {
    const response = await api.get<RepsonseWithIngredients>(`/fridges/${fridgeId}/ingredients`, { params: { ...options }});
    return response.data.ingredients;
  },
  createIngredient: async function(fridgeId: string, ingredientTypeId: string, amount: number, measurementUnitId: string) {
    const response = await api.post<ResponseWithIngredient>(`/fridges/${fridgeId}/ingredients`, {
      ingredientTypeId,
      amount,
      measurementUnitId,
    });

    return response.data.ingredient;
  }
}

export default IngredientAPI;