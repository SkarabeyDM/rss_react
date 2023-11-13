import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useQuery } from '../model/hooks';
import { SearchResponse, CardData, PokemonAPI } from '../model';

export type SearchContextType = {
  query: {
    search: string | null;
    page: number;
  };
  response: SearchResponse<CardData> | null;
};

export const SearchContext = createContext<SearchContextType>(null!);

export function SearchContextProvider({ children }: PropsWithChildren) {
  const { searchQuery } = useQuery();
  const [results, setResults] = useState<SearchResponse<CardData> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await PokemonAPI.getCardsByQuery({
        q: `name:*${searchQuery.search ?? ''}*`,
        page: searchQuery.page,
        pageSize: 20,
      });

      setResults(response);
    };

    loadData();
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={{ query: searchQuery, response: results }}>
      {children}
    </SearchContext.Provider>
  );
}
