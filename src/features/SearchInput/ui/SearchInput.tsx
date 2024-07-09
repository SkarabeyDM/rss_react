import React, { Component } from 'react';
import { SEARCH_TERM_KEY } from '@shared/const';

export type SearchInputState = {
  searchTerm: string;
};

export type SearchInputProps = {
  onSubmit: (searchTerm: string) => void;
};

export class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = { searchTerm: localStorage.getItem(SEARCH_TERM_KEY) ?? '' };
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.currentTarget.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    const { onSubmit } = this.props;

    const trimmedSearchTerm = searchTerm.trim();
    onSubmit(trimmedSearchTerm);
    localStorage.setItem(SEARCH_TERM_KEY, trimmedSearchTerm);
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <form className="search_input" onSubmit={this.handleSubmit}>
        <input
          type="search"
          className="search_input__input"
          defaultValue={searchTerm}
          onChange={this.handleChange}
        />
        <button className="search_input__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
