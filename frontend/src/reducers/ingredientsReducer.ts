import { Ingredient } from '@fridgeTypes/Ingredient'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import IngredientAPI from '@src/apiLayer/IngredientAPI';
import { RootState } from '@src/store';
import { filterUnique } from '@src/utils/fridge';

interface extendFridgeIngredientsPayload {
  fridgeId: string,
  search?: string,
  limit?: number,
}

const defaultLimit = 6;
export const extendFridgeIngredients = createAsyncThunk<Ingredient[], extendFridgeIngredientsPayload, { state: RootState }>(
  '/ingredients/index',
  async ({ fridgeId, search, limit }, thunkAPI) => {
    
    const ingredients = thunkAPI.getState().ingredientData.ingredients;
    const newIngredients = await IngredientAPI.indexFridgeIngredients(fridgeId, {
      limit: limit || defaultLimit,
      cursor: ingredients.length > 0 ? ingredients[ingredients.length - 1].id : undefined,
      offset: ingredients.length > 0 ? 1 : 0,
      search,
    });
    
    return newIngredients;
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredientData',
  initialState: {
    ingredients: [] as Ingredient[],
    hasMoreIngredients: true,
  },
  reducers: {
    addIngredientStart(state, action: PayloadAction<{ ingredient: Ingredient}>) {
      return {
        ...state,
        ingredients: [action.payload.ingredient, ...state.ingredients]
      };
    },
    addIngredients(state, action: PayloadAction<{ ingredients: Ingredient[]}>) {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload.ingredients]
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
    builder.addCase(extendFridgeIngredients.fulfilled, (state, action) => {
      const newIngredients = action.payload;
      if(newIngredients.length < (action.meta.arg.limit || defaultLimit)) {
        state.hasMoreIngredients = false;
      }

      state.ingredients = filterUnique([...state.ingredients, ...newIngredients]);
    });
  }
});

export const { addIngredientStart, addIngredients, removeIngredient, clearIngredients, addOrReplaceIngredient }  = ingredientsSlice.actions;
export default ingredientsSlice.reducer;