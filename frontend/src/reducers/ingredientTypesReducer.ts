import { IngredientType } from '@fridgeTypes/IngredientType';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import IngredientTypeAPI from '@src/apiLayer/IngredientTypeAPI';
import { RootState } from '@src/store';

const filterUniqueIngredientTypes = (array: Array<IngredientType>) : Array<IngredientType> => {
  return Array.from(new Map(array.map(item => [item.id, item])).values());
}

interface ExtendIngredientTypesPayload {
  search?: string,
  limit?: number,
}

const defaultLimit = 6;
export const extendIngredientTypes = createAsyncThunk<IngredientType[], ExtendIngredientTypesPayload, { state: RootState }>(
  '/ingredientTypes/index',
  async ({ search, limit }, thunkAPI) => {
    const ingredientTypes = thunkAPI.getState().ingredientTypeData.ingredientTypes;
    const newIngredientTypes = await IngredientTypeAPI.indexTailoredIngredientTypes({
      limit: limit || defaultLimit,
      cursor: ingredientTypes.length > 0 ? ingredientTypes[ingredientTypes.length - 1].id : undefined,
      offset: ingredientTypes.length > 0 ? 1 : 0,
      search,
    })

    return newIngredientTypes;
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
    addNewIngredientType(state, action: PayloadAction<{ ingredientType: IngredientType}>) {
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(extendIngredientTypes.fulfilled, (state, action) => {
      const newIngredientTypes = action.payload;
      if(newIngredientTypes.length < (action.meta.arg.limit || defaultLimit)) {
        state.hasMoreIngredientTypes = false;
      }
      state.ingredientTypes = filterUniqueIngredientTypes([...state.ingredientTypes, ...newIngredientTypes]);
    });
  }
});

export const { addNewIngredientType, removeIngredientType, clearIngredientTypes }  = ingredientTypesSlice.actions;
export default ingredientTypesSlice.reducer;