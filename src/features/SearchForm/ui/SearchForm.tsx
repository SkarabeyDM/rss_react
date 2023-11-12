import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.scss';

export function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    searchParams.set('search', search);
    searchParams.delete('page');
    setSearchParams(searchParams);
    event.preventDefault();
  };

  return (
    <form className={styles.search_form} onSubmit={handleSubmit}>
      <input
        className={styles.search_form__input_text}
        type="text"
        onChange={handleChange}
        placeholder="Enter character's name"
        value={search}
      />
      <input
        className={styles.search_form__input_button}
        type="submit"
        value={'Search'}
      />
    </form>
  );
}
