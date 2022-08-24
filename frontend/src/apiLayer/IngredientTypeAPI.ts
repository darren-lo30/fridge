import api from "@configs/axiosConfig";
import { PaginationParams } from "@fridgeTypes/API";
import { ResponseWithIngredientTypes } from "@fridgeTypes/IngredientType";

const IngredientTypeAPI = {
  indexTailoredIngredientTypes: async function ( options: PaginationParams) {
    const response = await api.get<ResponseWithIngredientTypes>(`/ingredientTypes`, { params: { show: 'tailored', ...options }});
    return response.data.ingredientTypes;
  } 
}

export default IngredientTypeAPI;