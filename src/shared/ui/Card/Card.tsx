import type { IPeople } from 'swapi-ts';
import { getImageByUrl } from '@shared/utils/utils';
import style from './Card.module.scss';

export type CardProps = {
  data: IPeople;
};

export function Card(props: CardProps) {
  const { data } = props;
  const imageUrl = getImageByUrl(data.url) ?? '';
  return (
    <article className={style.card}>
      <div className={style.card_wrapper}>
        <img className={style.card_image} src={imageUrl} alt={data.name} />
        <h2>{data.name}</h2>
      </div>
    </article>
  );
}
