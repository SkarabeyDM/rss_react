import { SearchInput } from '@features/SearchInput';
import { SEARCH_TERM_KEY } from '@shared/const';
import { SwapiPeople } from '@shared/types/api';
import { Card } from '@shared/ui/Card';
import React, { Component } from 'react';

export type SearchState = {
  results?: SwapiPeople[];
  error: string | null;
  isLoading: boolean;
};

export class Search extends Component<object, SearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: undefined,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.fetchResults(localStorage.getItem(SEARCH_TERM_KEY) ?? '');
  }

  fetchResults = async (searchTerm: string) => {
    try {
      this.setState({ isLoading: true });
      const trimmedSearchTerm = searchTerm.trim();
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${trimmedSearchTerm}`
      );
      const data: { results: SwapiPeople[] } = await response.json();
      this.setState({ results: data.results, error: null, isLoading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch results' });
      console.error('Fetch error:', error);
    }
  };

  renderList = () => {
    const { results, isLoading } = this.state;

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

  render(): React.ReactNode {
    const { error } = this.state;
    if (error) throw new Error();
    return (
      <div>
        <SearchInput onSubmit={this.fetchResults} />
        <section className="card_list">{this.renderList()}</section>
        <button
          type="button"
          className="error_button"
          onClick={() => this.setState({ error: 'Button Error' })}
        >
          ! Throw Error !
        </button>
      </div>
    );
  }
}
