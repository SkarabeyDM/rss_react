import type React from 'react';
import { useState } from 'react';
import { SEARCH_TERM_KEY } from '@shared/const';

export type SearchInputState = {
  searchTerm: string;
};

export type SearchInputProps = {
  onSubmit: (searchTerm: string) => void;
};

export function SearchInput(props: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(SEARCH_TERM_KEY) ?? ''
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { onSubmit } = props;
    const trimmedSearchTerm = searchTerm.trim();
    onSubmit(trimmedSearchTerm);
    localStorage.setItem(SEARCH_TERM_KEY, trimmedSearchTerm);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };
  return (
    <form className="search_input" onSubmit={handleSubmit}>
      <input
        type="search"
        className="search_input__input"
        defaultValue={searchTerm}
        onChange={handleChange}
      />
      <button className="search_input__button" type="submit">
        Search
      </button>
    </form>
  );
}
