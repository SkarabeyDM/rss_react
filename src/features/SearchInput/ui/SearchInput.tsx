import React, { Component } from "react";
import { SEARCH_TERM_KEY } from "@shared/const";

export type SearchInputState = {
  searchTerm: string;
};

export type SearchInputProps = {
  onSubmit: (searchTerm: string) => void;
};

export class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
  }
  state = { searchTerm: localStorage.getItem(SEARCH_TERM_KEY) ?? "" };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.currentTarget.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.props.onSubmit(trimmedSearchTerm);
    localStorage.setItem(SEARCH_TERM_KEY, trimmedSearchTerm);
  };

  render() {
    return (
      <form className="search_input" onSubmit={this.handleSubmit}>
        <input
          type="search"
          className="search_input__input"
          defaultValue={this.state.searchTerm}
          onChange={this.handleChange}
        />
        <button className="search_input__button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
