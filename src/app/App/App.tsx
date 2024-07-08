import React from "react";
import "./App.css";
import { Search } from "@widgets/Search";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <main>
        <Search />
      </main>
    );
  }
}

export { App };
