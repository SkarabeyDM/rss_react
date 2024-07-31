import { useAppDispatch, useAppSelector } from '@shared/hooks/storeHooks';
import { clear, selectCardList } from '@shared/store/slices/cardListSlice';
import classNames from 'classnames';
import { stringify } from 'csv-stringify/browser/esm/sync';
import type { IPeople } from '@shared/types';
import type { EntityState } from '@reduxjs/toolkit';
import style from './SelectionMenu.module.scss';

const createCSV = (cards: EntityState<IPeople, string>) => {
  const list = Object.values(cards.entities);
  if (!list.length) return '';
  return stringify([
    Object.keys(list[0]),
    ...list.map((card) => Object.values(card)),
  ]);
};

export function SelectionMenu() {
  const cards = useAppSelector(selectCardList);
  const dispatch = useAppDispatch();
  const cardCount = cards.ids.length;
  const hasCards = !!cardCount;

  return (
    <div className={classNames(style.selectionMenu, hasCards || style.hide)}>
      <button
        type="button"
        onClick={() => {
          dispatch(clear());
        }}
      >
        Unselect All
      </button>
      <a
        href={`data:text/csv;charset=utf-8, "sep=,"\n${createCSV(cards)}`}
        download={`${cardCount}_sw_people.csv`}
      >
        <button type="button">Download{` (${cardCount})`}</button>
      </a>
    </div>
  );
}
