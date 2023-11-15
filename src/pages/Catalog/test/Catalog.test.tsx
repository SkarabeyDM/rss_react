import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test } from 'vitest';
import { Catalog } from '../ui/Catalog';

describe('Catalog', () => {
  test('Rendering', () => {
    render(
      <MemoryRouter>
        <Catalog />
      </MemoryRouter>
    );
  });
});
