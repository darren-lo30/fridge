import { Ingredient } from '@fridgeTypes/Ingredient'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const filterUniqueIngredients = (array: Array<Ingredient>) : Array<Ingredient> => {
  return Array.from(new Map(array.map(item => [item.id, item])).values());
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: [] as Ingredient[],
  reducers: {
    addNewIngredient(state, action: PayloadAction<{ ingredient: Ingredient}>) {
      return [action.payload.ingredient, ...state];
    },
    extendIngredients(state, action: PayloadAction<{ ingredients: Ingredient[]}>) {
      return filterUniqueIngredients([...state, ...action.payload.ingredients]);
    },
    removeIngredient(state, action: PayloadAction<{ ingredientId: string }>) {
      return state.filter((ingredient) => ingredient.id !== action.payload.ingredientId);
    },
    clearIngredients() {
      return [];
    }
  }
});

export const { addNewIngredient, extendIngredients, removeIngredient, clearIngredients }  = ingredientsSlice.actions;
export default ingredientsSlice.reducer;