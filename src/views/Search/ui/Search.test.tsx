import { renderWithProviders, server } from '@tests/mocks';
import { useState } from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { PEOPLE_FIRST_PAGE } from '@tests/mocks/people';
import { Search } from './Search';

let mockSearchParam = '';

describe('Search', () => {
  vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        },
      ];
    },
  }));

  const renderSearch = () => {
    const rendered = renderWithProviders(<Search />, {
      path: '/search/:q?',
      router: { initialEntries: ['/search?page=1'] },
    });
    const cardListElement = rendered.getByTestId('card-list');
    const paginatorElements = rendered.getAllByTestId('paginator');

    return { ...rendered, cardListElement, paginatorElements };
  };

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('render', () => {
    const { cardListElement, paginatorElements } = renderSearch();

    expect(cardListElement).toBeInTheDocument();
    expect(paginatorElements.length).toBe(2);
  });

  it('first page', async () => {
    const { queryByText, getAllByTestId } = renderSearch();

    await waitForElementToBeRemoved(queryByText('Loading...'));

    const cards = getAllByTestId('card');

    expect(cards.length).toBe(5);

    cards.forEach((card, i) => {
      expect(card).toHaveTextContent(PEOPLE_FIRST_PAGE.results[i].name);
    });
  });
});
