import React from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardBrowser } from '../../../widgets/CardBrowser';

export function Catalog() {
  return (
    <>
      <section>
        <SearchForm />
      </section>
      <section>
        <CardBrowser />
      </section>
    </>
  );
}
