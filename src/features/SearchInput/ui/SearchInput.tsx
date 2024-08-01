import React, { useState } from 'react';
import { SEARCH_TERM_KEY } from '@shared/const';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '@shared/hooks';
import style from './SearchInput.module.scss';

export interface SearchInputState {
  searchTerm: string;
}

export function SearchInput() {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage(
    SEARCH_TERM_KEY,
    ''
  );
  const [, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(localSearchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    setSearchParams(() => {
      const params = new URLSearchParams();
      params.set('q', trimmedSearchTerm);
      return params;
    });
    setLocalSearchTerm(trimmedSearchTerm);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <form className={style.searchInput} onSubmit={handleSubmit}>
      <input
        type="search"
        className={style.searchInputInput}
        defaultValue={searchTerm}
        onChange={handleChange}
        aria-label="Search input"
      />
      <button
        className={style.searchInputButton}
        type="submit"
        aria-label="Search button"
      >
        Search
      </button>
    </form>
  );
}
