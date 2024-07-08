import React from "react";
import "./App.css";
import { Search } from "@widgets/Search";
import { ErrorBoundary } from "@shared/ui/ErrorBoundary";

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <main>
        <ErrorBoundary fallback={<div>OOPS!</div>}>
          <Search />
        </ErrorBoundary>
      </main>
    );
  }
}

export { App };
