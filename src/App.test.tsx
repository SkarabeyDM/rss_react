import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { App } from './App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  test('should', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(true).toBeTruthy();
  });
  test('landing on a bad page', async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={["/a/"]}>
        <App />
      </MemoryRouter>
    );

    await findByTestId('NotFound');
  });
});
