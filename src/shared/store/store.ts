import { configureStore } from '@reduxjs/toolkit';
import { SWAPI } from '@shared/api';
import { cardListReducer } from './slices/cardListSlice';

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: { cardList: cardListReducer, [SWAPI.reducerPath]: SWAPI.reducer },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(SWAPI.middleware);
    },
    preloadedState,
  });
};

export const store = configureStore({
  reducer: { cardList: cardListReducer, [SWAPI.reducerPath]: SWAPI.reducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(SWAPI.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Store = typeof store;
