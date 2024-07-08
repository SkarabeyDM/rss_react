import { SearchInput } from "@features/SearchInput";
import { SEARCH_TERM_KEY } from "@shared/const";
import { swapiPeople } from "@shared/types/api";
import { Card } from "@shared/ui/Card";
import React, { Component } from "react";

export type SearchState = {
  results?: swapiPeople[];
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

  fetchResults = async (searchTerm: string) => {
    try {
      this.setState({ isLoading: true });
      searchTerm = searchTerm.trim();
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      const data: { results: swapiPeople[] } = await response.json();
      this.setState({ results: data.results, error: null, isLoading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch results" });
      console.error("Fetch error:", error);
    }
  };

  componentDidMount(): void {
    this.fetchResults(localStorage.getItem(SEARCH_TERM_KEY) ?? "");
  }

  renderList = () => {
    const { results, isLoading } = this.state;

    if (isLoading) return "Loading...";
    if (!results || !results.length) return "No results :(";

    return results.map((data) => {
      const {
        name,
        birth_year,
        gender,
        height,
        mass,
        hair_color,
        eye_color,
        skin_color,
      } = data;
      return (
        <Card
          {...{
            name,
            birth_year,
            gender,
            height,
            mass,
            hair_color,
            eye_color,
            skin_color,
          }}
          key={data.name}
        ></Card>
      );
    });
  };

  render(): React.ReactNode {
    if (this.state.error) throw new Error();
    return (
      <div>
        <SearchInput onSubmit={this.fetchResults} />
        <section className="card_list">{this.renderList()}</section>
        <button
          className="error_button"
          onClick={() => this.setState({ error: "Button Error" })}
        >
          ! Throw Error !
        </button>
      </div>
    );
  }
}
