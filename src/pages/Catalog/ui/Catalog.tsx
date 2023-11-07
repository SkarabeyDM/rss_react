import React, { useEffect, useState } from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardBrowser } from '../../../widgets/CardBrowser';
import { CardData, PokemonAPI, SearchResponse } from '../../../shared/model';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../shared/model/hooks';
import { Section } from '../../../shared/Section';

export type CatalogStateQuery = {
  search: string;
  page: number;
};

export type CatalogStateResults = SearchResponse<CardData> | null;

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery } = useQuery();
  const [results, setResults] = useState<CatalogStateResults>(null);

  const handleSearch = (search: string, page = 1) => {
    searchParams.set('search', search);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const loadData = async () => {
      console.log(searchQuery);
      const response = await PokemonAPI.getCardsByQuery({
        q: `name:${searchQuery.str ?? ''}*`,
        page: searchQuery.page,
        pageSize: 20,
      });

      setResults(response);
    };

    loadData();
  }, [searchQuery]);

  return (
    <>
      <Section>
        <SearchForm
          onSubmit={handleSearch}
          startSearch={searchQuery.str ?? ''}
        />
      </Section>
      <Section>
        <CardBrowser cards={results?.data ?? []} />
      </Section>
    </>
  );
}
