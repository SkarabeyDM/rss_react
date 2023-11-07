import { Card } from '../../../shared/Card';
import { CardData } from '../../../shared/model';
import styles from './CardBrowser.module.scss';

export type CardBrowserProps = {
  cards: CardData[];
};

export function CardBrowser({ cards }: CardBrowserProps) {
  return (
    <div className={styles.card_browser}>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
