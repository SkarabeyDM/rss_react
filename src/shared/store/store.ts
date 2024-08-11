/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
import { configureStore } from '@reduxjs/toolkit';
import { SWAPI } from '@shared/api';
import { cardListReducer } from './slices/cardListSlice';

export let store = configureStore({
  reducer: { cardList: cardListReducer, [SWAPI.reducerPath]: SWAPI.reducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(SWAPI.middleware);
  },
});

export const setupStore = () => {
  store = configureStore({
    reducer: { cardList: cardListReducer, [SWAPI.reducerPath]: SWAPI.reducer },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(SWAPI.middleware);
    },
  });
  return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
