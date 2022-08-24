import { Ingredient } from '@fridgeTypes/Ingredient'
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

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
    clearIngredients() {
      return [];
    }
  }
});

export const { addNewIngredient, extendIngredients, clearIngredients }  = ingredientsSlice.actions;
export default ingredientsSlice.reducer;