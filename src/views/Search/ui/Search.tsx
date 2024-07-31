import type { PaginatorProps } from '@features/Paginator';
import { Paginator } from '@features/Paginator';
import { SearchInput } from '@features/SearchInput';
import { Card } from '@features/Card';
import { getIdByUrl } from '@shared/utils/utils';
import { useSearchParams } from 'react-router-dom';
import { CardDetailed } from '@widgets/CardDetailed';
import { SelectionMenu } from '@features/SelectionMenu';
import { SWAPI } from '@shared/api';
import { ErrorButton } from '@features/ErrorButton';
import style from './Search.module.scss';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? 1);
  const q = searchParams.get('q') ?? '';
  const cardId = searchParams.get('card');

  const {
    data: response,
    isLoading,
    error,
  } = SWAPI.useGetPeopleBySearchQuery({
    search: q,
    page,
  });

  const renderList = () => {
    if (isLoading) return 'Loading...';
    if (!response || !response.results.length) return 'No results :(';
    const { results } = response;
    return results.map((data) => {
      const id = getIdByUrl(data.url);
      return (
        <Card
          data={data}
          onClick={() =>
            setSearchParams(() => {
              searchParams.set('card', id);
              return searchParams;
            })
          }
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
      setSearchParams((params) => {
        params.set('page', nextPage.toString());
        return params;
      });
    },
  };

  return (
    <div className={style.searchWrapper}>
      <SearchInput />
      <div className={style.paginatorWrapper}>
        <Paginator {...paginatorProps} />
      </div>
      <div className={style.searchResultsWrapper}>
        <section className={style.searchResults}>
          <section className={style.cardList}>{renderList()}</section>
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
