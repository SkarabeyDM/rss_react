import { Card } from '../../../shared/Card';
import { CardData } from '../../../app/api';
import styles from './CardList.module.scss';

export type CardListProps = {
  cards: CardData[];
};

export function CardList({ cards }: CardListProps) {
  return (
    <div className={styles.card_list}>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
