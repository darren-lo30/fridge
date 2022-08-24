import ingredientsReducer from '@reducers/ingredientsReducer';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
