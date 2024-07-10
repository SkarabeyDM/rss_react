import { SearchInput } from '@features/SearchInput';
import { SEARCH_TERM_KEY } from '@shared/const';
import type { SwapiPeople } from '@shared/types/api';
import { Card } from '@shared/ui/Card';
import { useEffect, useState } from 'react';

export type SearchState = {
  results?: SwapiPeople[];
  error: string | null;
  isLoading: boolean;
};

export function Search() {
  const [results, setResults] = useState<SwapiPeople[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const trimmedSearchTerm = searchTerm.trim();
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${trimmedSearchTerm}`
      );
      const data: { results: SwapiPeople[] } = await response.json();
      setIsLoading(false);
      setError(null);
      setResults(data.results);
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
      return (
        <Card
          name={data.name}
          birth_year={data.birth_year}
          gender={data.gender}
          height={data.height}
          mass={data.mass}
          hair_color={data.hair_color}
          eye_color={data.eye_color}
          skin_color={data.skin_color}
          key={data.name}
        />
      );
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
