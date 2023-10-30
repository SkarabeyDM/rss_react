import React, { Component } from 'react';
import { SearchForm } from '../../../features/SearchForm';

export class MainPage extends Component {
  render() {
    return (
      <div>
        <SearchForm onSubmit={() => {}} />
      </div>
    );
  }
}
