import api from "@configs/axiosConfig";
import { ResponseWithRecipes } from "@fridgeTypes/Recipe";

const RecipeAPI = {
  getTailoredRecipes: async function (options : {limit?: number, cursor?: string, offset?: number}) {    
    options.limit = options.limit || 10;
    
    const response = await api.get<ResponseWithRecipes>(
      `/recipes?
        show=tailored
        &limit=${options.limit}
        &${options.cursor ? `cursor=${options.cursor}` : ''}
        &${options.offset ? `offset=${options.offset}`: ''}
      `);
    return response.data.recipes;
  },

  getAllRecipes: async function () {
    const response = await api.get<ResponseWithRecipes>(`/recipes?show=all`,);
    return response.data.recipes;
  },
}

export default RecipeAPI;