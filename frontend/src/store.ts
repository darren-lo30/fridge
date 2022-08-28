import ingredientsReducer from '@reducers/ingredientsReducer';
import ingredientTypesReducer from './reducers/ingredientTypesReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    ingredientTypeData: ingredientTypesReducer,
    ingredientData: ingredientsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;