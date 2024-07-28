import type { IPeople } from 'swapi-ts';
import { getImageByUrl } from '@shared/utils';
import type React from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/storeHooks';
import {
  add,
  remove,
  selectCardList,
} from '@shared/store/slices/cardListSlice';
import style from './Card.module.scss';

export type CardProps = React.ComponentProps<'article'> & {
  data: IPeople;
};

export function Card({ data, ...otherProps }: CardProps) {
  const cards = useAppSelector(selectCardList);
  const dispatch = useAppDispatch();
  const checked = cards.find(({ url }) => url === data.url);
  const imageUrl = getImageByUrl(data.url) ?? '';

  return (
    <article className={style.card} {...otherProps}>
      <img className={style.card_image} src={imageUrl} alt={data.name} />
      <h2 className={style.cardTitle}>{data.name}</h2>
      <button
        className={style.selectButton}
        type="button"
        onClick={() => {
          if (checked) dispatch(remove(data));
          else dispatch(add(data));
        }}
      >
        {checked ? 'Remove' : 'Add'}
      </button>
    </article>
  );
}
