import type { IPeople } from '@shared/types';
import { getImageByUrl } from '@shared/utils';
import type React from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/storeHooks';
import {
  add,
  remove,
  selectCardList,
} from '@shared/store/slices/cardListSlice';
import classNames from 'classnames';
import { globalClasses } from '@shared/style';
import style from './Card.module.scss';

export interface CardProps extends React.ComponentProps<'article'> {
  data: IPeople;
}

export function Card({ data, ...otherProps }: CardProps) {
  const cards = useAppSelector(selectCardList);
  const dispatch = useAppDispatch();
  const checked = data.url in cards.entities;
  const imageUrl = getImageByUrl(data.url) ?? '';

  return (
    <article className={style.card} {...otherProps}>
      <img className={style.card_image} src={imageUrl} alt={data.name} />
      <h2 className={style.cardTitle}>{data.name}</h2>
      <button
        className={classNames(
          style.selectButton,
          checked || globalClasses.primary
        )}
        type="button"
        onClick={() => {
          dispatch(checked ? remove(data.url) : add(data));
        }}
      >
        {checked ? 'Remove' : 'Add'}
      </button>
    </article>
  );
}
