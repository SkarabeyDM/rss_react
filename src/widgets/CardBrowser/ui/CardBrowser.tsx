import { ComponentProps, useContext } from 'react';
import { Paginator } from '../../../features/Paginator';
import { Card } from '../../../shared/Card';
import styles from './CardBrowser.module.scss';
import { CardDetailed } from '../../../shared/Card/ui/Card.Detailed';
import { SearchContext } from '../../../shared/сontext';
import { useSearchParams } from 'react-router-dom';

export type CardBrowserProps = ComponentProps<'div'>;

export function CardBrowser({ className, ...otherProps }: CardBrowserProps) {
  const { response } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams();

  const setPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', event.currentTarget.value);
      return searchParams;
    });
  };

  if (!response) return 'Loading...';
  if (response.totalCount === 0) return 'No results (°◠°)';

  const { data, totalCount, page, pageSize } = response;

  return (
    <div
      className={`${styles.card_browser} ${className ?? ''}`}
      data-testid={'CardBrowser'}
      {...otherProps}
    >
      <div className={`${styles.card_browser__paginator}`}>
        <div className={styles.card_browser__list}>
          {data.map((card) => (
            <Card data-testid={'card'} key={card.id} cardData={card} />
          ))}
        </div>
        <Paginator
          {...{
            totalCount,
            page,
            pageSize,
            onSubmitPage: setPage,
          }}
        />
      </div>
      <CardDetailed />
    </div>
  );
}
