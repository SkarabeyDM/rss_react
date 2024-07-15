import { Paginator } from '@features/Paginator';
import { SearchInput } from '@features/SearchInput';
import { Card } from '@shared/ui/Card';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { IPeople } from 'swapi-ts';
import { People } from 'swapi-ts';

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

  const [response, setResponse] = useState<SwapiResponse>({
    count: 0,
    results: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const data = await People.getPage(page, q);
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
      return <Card data={data} key={data.name} />;
    });
  };

  if (error) throw new Error();
  const { count } = response;

  return (
    <div>
      <SearchInput />
      <section className="card_list">
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
        {renderList()}
      </section>
      <button
        type="button"
        className="error_button"
        onClick={() => setError('Button Error')}
      >
        ! Throw Error !
      </button>
    </div>
  );
}
