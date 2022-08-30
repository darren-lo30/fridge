import { IngredientType } from '@fridgeTypes/IngredientType';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import IngredientTypeAPI from '@src/apiLayer/IngredientTypeAPI';
import { RootState } from '@src/store';
import { filterUnique } from '@src/utils/fridge';

export interface ExtendIngredientTypesPayload {
  indexType: 'all' | 'tailored'
  search?: string,
  limit?: number,
}

const defaultLimit = 6;
export const extendIngredientTypes = createAsyncThunk<IngredientType[], ExtendIngredientTypesPayload, { state: RootState }>(
  '/ingredientTypes/index',
  async ({ search, limit, indexType}, thunkAPI) => {
    const ingredientTypes = thunkAPI.getState().ingredientTypeData.ingredientTypes;

    const indexArgs = {
      limit: limit || defaultLimit,
      cursor: ingredientTypes.length > 0 ? ingredientTypes[ingredientTypes.length - 1].id : undefined,
      offset: ingredientTypes.length > 0 ? 1 : 0,
      search,
    }

    if(indexType === 'tailored') {
      return IngredientTypeAPI.indexTailoredIngredientTypes(indexArgs);
    } else {
      return IngredientTypeAPI.indexAllIngredientTypes(indexArgs);
    }
  }
)


interface IngredientTypeState {
  hasMoreIngredientTypes: boolean,
  ingredientTypes: IngredientType[],
}

const initialState = {
  hasMoreIngredientTypes: true,
  ingredientTypes: [] as IngredientType[]
} as IngredientTypeState;

const ingredientTypesSlice = createSlice({
  name: 'ingredientTypeData',
  initialState,
  reducers: {
    addIngredientTypeStart(state, action: PayloadAction<{ ingredientType: IngredientType}>) {
      return ({
        ...state,
        ingredientTypes: [action.payload.ingredientType, ...state.ingredientTypes],
      });
    },
    removeIngredientType(state, action: PayloadAction<{ ingredientTypeId: string}>) {
      return ({
        ...state,
        ingredientTypes: state.ingredientTypes.filter((ingredientType) => ingredientType.id !== action.payload.ingredientTypeId),
      });
    },
    clearIngredientTypes() {
      return ({
        hasMoreIngredientTypes: true,
        ingredientTypes: [],
      });
    },
    filterIngredientTypes(state, action: PayloadAction<{ removeIds: string[] }>) {
      return ({
        ...state,
        ingredientTypes: state.ingredientTypes.filter((ingredientType) => !action.payload.removeIds.includes(ingredientType.id)),
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(extendIngredientTypes.fulfilled, (state, action) => {
      const newIngredientTypes = action.payload;
      if(newIngredientTypes.length < (action.meta.arg.limit || defaultLimit)) {
        state.hasMoreIngredientTypes = false;
      }

      state.ingredientTypes = filterUnique([...state.ingredientTypes, ...newIngredientTypes]);
    });
  }
});

export const { addIngredientTypeStart, removeIngredientType, clearIngredientTypes, filterIngredientTypes }  = ingredientTypesSlice.actions;
export default ingredientTypesSlice.reducer;