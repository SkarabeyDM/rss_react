import React, { useState } from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardList } from '../../../features/CardList';
import { CardData, PokemonAPI, SearchResponse } from '../../../app/api';

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
    <div>
      <SearchForm onSubmit={handleSearch} startSearch="" />
      <CardList cards={state.result?.data ?? []} />
    </div>
  );
}
