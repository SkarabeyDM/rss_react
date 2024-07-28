import { configureStore } from '@reduxjs/toolkit';
import { cardListReducer } from './slices/cardListSlice';

export const store = configureStore({
  reducer: { cardList: cardListReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
