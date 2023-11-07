import React, { useState } from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardBrowser } from '../../../widgets/CardBrowser';
import { Section } from '../../../shared/Section';

export type CatalogState = {
  search: string;
  result: SearchResponse<CardData> | null;
};

export function Catalog() {
  const [state, setState] = useState<CatalogState>({
    search: '',
    result: null,
  });

  const handleSearch = async (search: string, page = 1) => {
    const response = await PokemonAPI.getCardsByQuery({
      q: `name:${search}*`,
      page,
      pageSize: 20,
    });

    setState({ search, result: response });
  };

  return (
    <>
      <Section>
        <SearchForm
          onSubmit={handleSearch}
          startSearch={state.search.str ?? ''}
        />
      </Section>
      <Section>
        <CardBrowser cards={state.results?.data ?? []} />
      </Section>
    </>
  );
}
