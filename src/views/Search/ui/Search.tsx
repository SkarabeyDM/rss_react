import { Paginator } from '@features/Paginator';
import { SearchInput } from '@features/SearchInput';
import { Card } from '@shared/ui/Card';
import { getIdByUrl } from '@shared/utils/utils';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import type { IPeople } from 'swapi-ts';
import { People } from '@shared/api/swapi';
import style from './Search.module.scss';

type SwapiResponse = {
  count: number;
  results: IPeople[];
};

export type SearchState = {
  data?: SwapiResponse;
  error: string | null;
  isLoading: boolean;
};

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') ?? 1);
  const q = searchParams.get('q') ?? '';
  const cardId = searchParams.get('card');

  const [response, setResponse] = useState<SwapiResponse>({
    count: 0,
    results: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await People.search(q, page);
      setIsLoading(false);
      setError(null);
      setResponse(data);
    } catch (err) {
      setError('Failed to fetch results');
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [searchParams]);

  const renderList = () => {
    if (isLoading) return 'Loading...';
    const { results } = response;
    if (!response || !results.length) return 'No results :(';
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

  if (error) throw new Error();
  const { count } = response;

  return (
    <>
      <SearchInput />
      <div className={style.paginatorWrapper}>
        <Paginator
          pageCount={Math.ceil(count / 10)}
          currentPage={page}
          siblingCount={1}
          onChangePage={(nextPage) =>
            setSearchParams((params) => {
              params.set('page', nextPage.toString());
              return params;
            })
          }
        />
      </div>
      <section className={style.searchResults}>
        <section className={style.cardList}>{renderList()}</section>
        {cardId && <Outlet />}
      </section>
      <button
        type="button"
        className="error_button"
        onClick={() => setError('Button Error')}
      >
        ! Throw Error !
      </button>
    </>
  );
}
