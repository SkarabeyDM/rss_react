import React from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardBrowser } from '../../../widgets/CardBrowser';
import { SearchContextProvider } from '../../../shared/сontext';

export function Catalog() {
  return (
    <>
      <section>
        <SearchForm />
      </section>
      <section>
        <SearchContextProvider>
          <CardBrowser />
        </SearchContextProvider>
      </section>
    </>
  );
}
