import { createSlice } from '@reduxjs/toolkit';
import type { IPeople } from 'swapi-ts';
import { createEntityAdapter } from '@reduxjs/toolkit/react';
import type { RootState } from '../store';

const cardAdapter = createEntityAdapter({
  selectId: (card: IPeople) => card.url,
});

export const cardListSlice = createSlice({
  name: 'cardList',
  initialState: cardAdapter.getInitialState(),
  reducers: {
    add: cardAdapter.addOne,
    remove: cardAdapter.removeOne,
    clear: cardAdapter.removeAll,
  },
});

export const { add, remove, clear } = cardListSlice.actions;

export const selectCardList = (state: RootState) => state.cardList;

export const cardListReducer = cardListSlice.reducer;
