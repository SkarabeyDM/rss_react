import { useAppDispatch, useAppSelector } from '@shared/hooks/storeHooks';
import { clear, selectCardList } from '@shared/store/slices/cardListSlice';
import classNames from 'classnames';
import { stringify } from 'csv-stringify/browser/esm/sync';
import style from './SelectionMenu.module.scss';

export function SelectionMenu() {
  const cards = useAppSelector(selectCardList);
  const dispatch = useAppDispatch();
  const hasCards = !!cards.length;
  const csv =
    cards.length &&
    stringify([
      Object.keys(cards[0]),
      ...cards.map((card) => Object.values(card)),
    ]);

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
        href={`data:text/csv;charset=utf-8, "sep=,"\n${csv}`}
        download={`${cards.length}_sw_people.csv`}
      >
        <button type="button">Download{` (${cards.length})`}</button>
      </a>
    </div>
  );
}
