import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { RepsonseWithIngredients } from "@fridgeTypes/Ingredient";

const IngredientAPI = {
  indexFridgeIngredients: async function (fridgeId: string, options: PaginationParams) {
    const response = await api.get<RepsonseWithIngredients>(`/fridges/${fridgeId}/ingredients`, { params: { ...options }});
    return response.data.ingredients;
  } 
}

export default IngredientAPI;