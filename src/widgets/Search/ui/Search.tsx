import { SearchInput } from '@features/SearchInput';
import { SEARCH_TERM_KEY } from '@shared/const';
import { Card } from '@shared/ui/Card';
import { useEffect, useState } from 'react';
import type { IPeople } from 'swapi-ts';
import { People } from 'swapi-ts';

export type SearchState = {
  results?: IPeople[];
  error: string | null;
  isLoading: boolean;
};

export function Search() {
  const [results, setResults] = useState<IPeople[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const trimmedSearchTerm = searchTerm.trim();
      const data = await People.findBySearch([trimmedSearchTerm]);
      setIsLoading(false);
      setError(null);
      console.log(data);
      setResults(data.resources.map((res) => res.value));
    } catch (err) {
      setError('Failed to fetch results');
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchResults(localStorage.getItem(SEARCH_TERM_KEY) ?? '');
  }, []);

  const renderList = () => {
    if (isLoading) return 'Loading...';
    if (!results || !results.length) return 'No results :(';

    return results.map((data) => {
      return <Card data={data} key={data.name} />;
    });
  };

  if (error) throw new Error();

  return (
    <div>
      <SearchInput onSubmit={fetchResults} />
      <section className="card_list">{renderList()}</section>
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
