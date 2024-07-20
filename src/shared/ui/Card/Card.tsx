import type { IPeople } from 'swapi-ts';
import { getImageByUrl } from '@shared/utils/utils';
import type React from 'react';
import style from './Card.module.scss';

export type CardProps = React.ComponentProps<'article'> & {
  data: IPeople;
};

export function Card({ data, ...otherProps }: CardProps) {
  const imageUrl = getImageByUrl(data.url) ?? '';
  return (
    <article className={style.card} {...otherProps}>
      <div className={style.card_wrapper}>
        <img className={style.card_image} src={imageUrl} alt={data.name} />
        <h2>{data.name}</h2>
      </div>
    </article>
  );
}
