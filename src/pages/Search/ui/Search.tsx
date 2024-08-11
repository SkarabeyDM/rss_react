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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import style from './Search.module.scss';

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardId = searchParams.get('card');
  const page = +(searchParams.get('page') ?? 1);
  const q = searchParams.get('q') ?? '';

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
      return (
        <Card
          data={data}
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('card', id);
            router.push(`${pathname}?${params}`);
          }}
          key={data.name}
        />
      );
    });
  };

  if (error) throw new Error('Fetching error');

  const count = response?.count ?? 0;
  const paginatorProps: PaginatorProps = {
    pageCount: Math.ceil(count / 10),
    currentPage: page,
    siblingCount: 1,
    onChangePage(nextPage) {
      const params = new URLSearchParams(searchParams);
      params.set('page', nextPage.toString());
      router.push(`${pathname}?${params}`);
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
