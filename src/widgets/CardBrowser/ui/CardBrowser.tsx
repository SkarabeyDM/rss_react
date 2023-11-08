import { ComponentProps, useEffect, useState } from 'react';
import { Paginator } from '../../../features/Paginator';
import { Card } from '../../../shared/Card';
import { CardData, PokemonAPI, SearchResponse } from '../../../shared/model';
import styles from './CardBrowser.module.scss';
import { useQuery } from '../../../shared/model/hooks';

export type CardBrowserProps = ComponentProps<'div'>;

export function CardBrowser({ className, ...otherProps }: CardBrowserProps) {
  const { searchQuery } = useQuery();
  const [results, setResults] = useState<SearchResponse<CardData> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await PokemonAPI.getCardsByQuery({
        q: `name:${searchQuery.str ?? ''}*`,
        page: searchQuery.page,
        pageSize: 20,
      });

      setResults(response);
    };

    loadData();
  }, [searchQuery]);

  if (!results) return 'Loading...';
  if (results.totalCount === 0) return 'No results :(';

  const { data, totalCount, page, pageSize } = results;
  return (
    <div
      className={`${styles.card_browser} ${className ?? ''}`}
      {...otherProps}
    >
      <div className={styles.card_browser}>
        {data.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <div className={styles.card_browser}>
        <Paginator {...{ totalCount, page, pageSize }} />
      </div>
    </div>
  );
}
