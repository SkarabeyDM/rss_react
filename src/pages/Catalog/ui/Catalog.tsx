import React from 'react';
import { SearchForm } from '../../../features/SearchForm';
import { CardBrowser } from '../../../widgets/CardBrowser';
import { Section } from '../../../shared/Section';

export function Catalog() {
  return (
    <>
      <Section>
        <SearchForm />
      </Section>
      <Section>
        <CardBrowser />
      </Section>
    </>
  );
}
