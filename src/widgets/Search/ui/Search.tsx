import { Paginator } from '@features/Paginator';
import { SearchInput } from '@features/SearchInput';
import { SEARCH_TERM_KEY } from '@shared/const';
import { Card } from '@shared/ui/Card';
import { useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(SEARCH_TERM_KEY) ?? ''
  );
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<SwapiResponse>({
    count: 0,
    results: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const trimmedSearchTerm = searchTerm.trim();
      const data = await People.getPage(page, trimmedSearchTerm);
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
  }, [searchTerm, page]);

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
      <SearchInput onSubmit={setSearchTerm} />
      <section className="card_list">
        <Paginator
          pageCount={Math.ceil(count / 10)}
          currentPage={page}
          siblingCount={1}
          onChangePage={setPage}
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
