import { renderWithProviders, server } from '@tests/mocks';
import { waitForElementToBeRemoved } from '@testing-library/react';
import { PEOPLE_FIRST_PAGE } from '@tests/mocks/people';
import { Search } from './Search';

describe('Search', () => {
  const renderSearch = () => {
    const rendered = renderWithProviders(<Search />);
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
