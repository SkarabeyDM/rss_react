import React from "react";
import "./App.css";
import { SearchInput } from "@features/SearchInput";
import { swapiPeople } from "@shared/types/api";
import { Card } from "@shared/ui/Card";
import { SEARCH_TERM_KEY } from "@shared/const";

export type AppState = {
  results?: swapiPeople[];
  error: string | null;
};

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: undefined,
      error: null,
    };
  }

  fetchResults = async (searchTerm: string) => {
    try {
      searchTerm = searchTerm.trim();
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      const data: { results: swapiPeople[] } = await response.json();
      console.log(data);
      this.setState({ results: data.results, error: null });
    } catch (error) {
      this.setState({ error: "Failed to fetch results" });
      console.error("Fetch error:", error);
    }
  };

  componentDidMount(): void {
    this.fetchResults(localStorage.getItem(SEARCH_TERM_KEY) ?? "");
  }

  render(): React.ReactNode {
    return (
      <div>
        <main>
          <SearchInput onSubmit={this.fetchResults} />
          <section className="card_list">
            {this.state.results?.map((data) => {
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
            }) ?? "No results"}
          </section>
        </main>
      </div>
    );
  }
}

export { App };
