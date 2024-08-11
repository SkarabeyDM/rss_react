import React, { useState } from 'react';
import { SEARCH_TERM_KEY } from '@shared/const';
import { useLocalStorage } from '@shared/hooks';
import { dice } from '@shared/utils/random';
import { useRouter } from 'next/router';
import style from './SearchInput.module.scss';

export interface SearchInputState {
  searchTerm: string;
}

export function SearchInput() {
  const [localSearchTerm, setLocalSearchTerm] = useLocalStorage(
    SEARCH_TERM_KEY,
    ''
  );
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(localSearchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    router.push({ pathname: '/search', query: { q: trimmedSearchTerm } });
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
        placeholder={dice<string>('jar', 'luk', 'R2', 'boba', 'wat', 'bib')}
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
