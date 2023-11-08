import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Enter character's name"
        value={search}
      />
      <input type="submit" value={'Search'} />
    </form>
  );
}
