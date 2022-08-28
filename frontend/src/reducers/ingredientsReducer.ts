import { Ingredient } from '@fridgeTypes/Ingredient'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import IngredientAPI from '@src/apiLayer/IngredientAPI';
import { RootState } from '@src/store';

const filterUniqueIngredients = (array: Array<Ingredient>) : Array<Ingredient> => {
  return Array.from(new Map(array.map(item => [item.id, item])).values());
}

interface ExtendINgredientsPayload {
  fridgeId: string,
  search?: string,
  limit?: number,
}

const defaultLimit = 6;
export const extendIngredients = createAsyncThunk<Ingredient[], ExtendINgredientsPayload, { state: RootState }>(
  '/ingredients/index',
  async ({ fridgeId, search, limit }, thunkAPI) => {
    const ingredients = thunkAPI.getState().ingredientData.ingredients;
    const newIngredientTypes = await IngredientAPI.indexFridgeIngredients(fridgeId, {
      limit: limit || defaultLimit,
      cursor: ingredients.length > 0 ? ingredients[ingredients.length - 1].id : undefined,
      offset: ingredients.length > 0 ? 1 : 0,
      search,
    })

    return newIngredientTypes;
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredientData',
  initialState: {
    ingredients: [] as Ingredient[],
    hasMoreIngredients: true,
  },
  reducers: {
    addNewIngredient(state, action: PayloadAction<{ ingredient: Ingredient}>) {
      return {
        ...state,
        ingredients: [action.payload.ingredient, ...state.ingredients]
      };
    },
    removeIngredient(state, action: PayloadAction<{ ingredientId: string }>) {
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => ingredient.id !== action.payload.ingredientId),
      }
    },
    addOrReplaceIngredient(state, action: PayloadAction<{ ingredient: Ingredient}>) {
      return {
        ...state, 
        ingredients: [action.payload.ingredient, ...state.ingredients.filter((ingredient) => ingredient.id !== action.payload.ingredient.id)],
      }
    },
    clearIngredients() {
      return {
        hasMoreIngredients: true,
        ingredients: [],
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(extendIngredients.fulfilled, (state, action) => {
      const newIngredients = action.payload;
      if(newIngredients.length < (action.meta.arg.limit || defaultLimit)) {
        state.hasMoreIngredients = false;
      }

      state.ingredients = filterUniqueIngredients([...state.ingredients, ...newIngredients]);
    });
  }
});

export const { addNewIngredient, removeIngredient, clearIngredients, addOrReplaceIngredient }  = ingredientsSlice.actions;
export default ingredientsSlice.reducer;