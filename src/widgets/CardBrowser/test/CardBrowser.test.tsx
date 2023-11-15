import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { SearchContextProvider } from '../../../shared/сontext';
import { CardBrowser } from '../ui/CardBrowser';
import { render, screen } from '@testing-library/react';
import { server } from '../../../mocks/node';
import { customPageHandler } from '../../../mocks/handlers';
import userEvent from '@testing-library/user-event';

const customRender = () =>
  render(
    <MemoryRouter>
      <SearchContextProvider>
        <CardBrowser />
      </SearchContextProvider>
    </MemoryRouter>
  );
describe('CardBrowser', () => {
  test('On start show "Loading..."', async () => {
    customRender();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('If the number of results is 0, show "No results"', async () => {
    server.use(
      customPageHandler({
        data: [],
        page: 1,
        totalCount: 0,
        count: 0,
        pageSize: 1,
      })
    );
    customRender();
    expect(await screen.findByText(/No results/)).toBeInTheDocument();
  });
  test('If data loaded, show cards', async () => {
    customRender();
    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toEqual(2);
  });
  test('Click paginator button', async () => {
    customRender();
    await userEvent.click(await screen.findByTestId('button-last'));
  });
});
