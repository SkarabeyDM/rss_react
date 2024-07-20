import React, { useState } from 'react';
import { SEARCH_TERM_KEY } from '@shared/const';
import { useSearchParams } from 'react-router-dom';

export type SearchInputState = {
  searchTerm: string;
};

export type SearchInputProps = {
  onSubmit?: (searchTerm: string) => void;
};

export function SearchInput({ onSubmit = () => {} }: SearchInputProps) {
  const [, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem(SEARCH_TERM_KEY) ?? ''
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    setSearchParams(() => {
      const params = new URLSearchParams();
      params.set('q', trimmedSearchTerm);
      return params;
    });
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
