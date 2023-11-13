import { ComponentProps, useContext } from 'react';
import { Paginator } from '../../../features/Paginator';
import { Card } from '../../../shared/Card';
import styles from './CardBrowser.module.scss';
import { CardDetailed } from '../../../shared/Card/ui/Card.Detailed';
import { SearchContext } from '../../../shared/сontext';

export type CardBrowserProps = ComponentProps<'div'>;

export function CardBrowser({ className, ...otherProps }: CardBrowserProps) {
  const { response } = useContext(SearchContext);

  if (!response) return 'Loading...';
  if (response.totalCount === 0) return 'No results (°◠°)';

  return (
    <div
      className={`${styles.card_browser} ${className ?? ''}`}
      {...otherProps}
    >
      <div className={`${styles.card_browser__paginator}`}>
        <div className={styles.card_browser__list}>
          {response.data.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <Paginator />
      </div>
      <CardDetailed />
    </div>
  );
}
