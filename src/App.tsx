import { Component } from 'react';
import './App.scss';
import { Catalog } from './widgets/Catalog';

export default class App extends Component {
  render() {
    return (
      <>
        <Catalog />
      </>
    );
  }
}
