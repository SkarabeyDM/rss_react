import React, { Component } from 'react';
import { Section } from '../../../shared/Section';

type SearchFormProps = {
  onSubmit: (query: string) => void;
};

type SearchFormState = {
  query: string;
};

export class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props = {onSubmit: () => {}}) {
    super(props);

    this.state = {
      query: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    this.setState({ query: value });
  }

  handleSubmit() {
    const { query } = this.state;
    localStorage.setItem('query', query);
    this.props.onSubmit(query);
  }

  componentDidMount() {
    this.setState({ query: localStorage.getItem('query') ?? '' });
  }

  render() {
    return (
      <Section>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Enter character's name"
            value={this.state.query}
          />
          <input type="submit" value={'Search'} />
        </form>
      </Section>
    );
  }
}
