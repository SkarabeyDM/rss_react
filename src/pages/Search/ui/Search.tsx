'use client';

import type { PaginatorProps } from '@features/Paginator';
import { Paginator } from '@features/Paginator';
import { SearchInput } from '@features/SearchInput';
import { Card } from '@features/Card';
import { getIdByUrl } from '@shared/utils/utils';
import { CardDetailed } from '@widgets/CardDetailed';
import { SelectionMenu } from '@features/SelectionMenu';
import { SWAPI } from '@shared/api';
import { ErrorButton } from '@features/ErrorButton';
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import style from './Search.module.scss';

export function Search() {
  const [query, setQuery] = useQueryStates(
    {
      q: parseAsString.withDefault(''),
      page: parseAsInteger.withDefault(1),
    },
    { scroll: false }
  );
  const [cardId, setCardId] = useQueryState('card', { scroll: false });
  const page = +(query.page ?? 1);
  const q = (query.q as string) ?? '';

  const {
    data: response,
    isLoading,
    error,
  } = SWAPI.useGetPeopleBySearchQuery({
    search: q,
    page,
  });

  const renderList = () => {
    if (isLoading) return <span>Loading...</span>;
    if (!response || !response.results.length)
      return <span>No results :(</span>;
    const { results } = response;
    return results.map((data) => {
      const id = getIdByUrl(data.url);
      return <Card data={data} onClick={() => setCardId(id)} key={data.name} />;
    });
  };

  if (error) throw new Error('Fetching error');

  const count = response?.count ?? 0;
  const paginatorProps: PaginatorProps = {
    pageCount: Math.ceil(count / 10),
    currentPage: page,
    siblingCount: 1,
    onChangePage(nextPage) {
      setQuery({ ...query, page: nextPage });
    },
  };

  return (
    <div className={style.searchWrapper} data-testid="search">
      <SearchInput />
      <div className={style.paginatorWrapper}>
        <Paginator {...paginatorProps} />
      </div>
      <div className={style.searchResultsWrapper}>
        <section className={style.searchResults}>
          <section className={style.cardList} data-testid="card-list">
            {renderList()}
          </section>
          <section className={style.cardDetailedWrapper}>
            {cardId && <CardDetailed />}
          </section>
        </section>
      </div>
      <div className={style.paginatorWrapper}>
        <Paginator {...paginatorProps} />
      </div>
      <SelectionMenu />
      <ErrorButton />
    </div>
  );
}
