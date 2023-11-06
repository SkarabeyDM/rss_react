import React, { Component } from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardList } from '../../../features/CardList';
import { CardData, PokemonAPI, SearchResponse } from '../../../app/api';

export type CatalogState = {
  search: string;
  result: SearchResponse<CardData> | null;
  page: number;
};

export class Catalog extends Component<object, CatalogState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      search: '',
      result: null,
      page: 1,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(search: string, page = 1) {
    const response = await PokemonAPI.getCardsByQuery({
      q: `name:${search}*`,
      page,
      pageSize: 20,
    });

    this.setState({ search, result: response, page: response.page });
  }

  render() {
    return (
      <div>
        <SearchForm onSubmit={this.handleSearch} />
        <CardList cards={this.state.result?.data ?? []} />
      </div>
    );
  }
}
