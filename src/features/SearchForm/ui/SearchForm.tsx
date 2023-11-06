import React, { useState } from 'react';
import { Section } from '../../../shared/Section';

type SearchFormProps = {
  onSubmit: (query: string) => void;
  startSearch: string;
};

export function SearchForm({ onSubmit, startSearch }: SearchFormProps) {
  const [search, setSearch] = useState(startSearch);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    onSubmit(search);
    event.preventDefault();
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter character's name"
          value={search}
        />
        <input type="submit" value={'Search'} />
      </form>
    </Section>
  );
}
