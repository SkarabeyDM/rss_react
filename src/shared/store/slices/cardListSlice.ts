import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IPeople } from 'swapi-ts';
import type { RootState } from '../store';

interface CardListState {
  cards: IPeople[];
}

const initialState: CardListState = { cards: [] };

export const cardListSlice = createSlice({
  name: 'cardList',
  initialState,
  reducers: {
    add(state, { payload }: PayloadAction<IPeople>) {
      state.cards.push(payload);
    },
    remove(state, { payload }: PayloadAction<IPeople | string>) {
      const key = typeof payload === 'string' ? payload : payload.url;
      state.cards = state.cards.filter(({ url }) => url !== key);
    },
    clear(state) {
      state.cards = [];
    },
  },
});

export const { add, remove, clear } = cardListSlice.actions;

export const selectCardList = (state: RootState) => state.cardList.cards;

export const cardListReducer = cardListSlice.reducer;
