import type { SwapiPeople } from '@shared/types/api';
import style from './Card.module.scss';

export type CardProps = Partial<SwapiPeople>;

export function Card(props: CardProps) {
  return (
    <div className={style.card}>
      {Object.entries(props).map(([key, value]) => {
        return (
          <div className={style.card_line} key={key}>{`${key}: ${value}`}</div>
        );
      })}
    </div>
  );
}
