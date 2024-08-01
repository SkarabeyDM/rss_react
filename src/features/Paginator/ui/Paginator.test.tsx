import { fireEvent, render } from '@testing-library/react';
import type { PaginatorProps } from './Paginator';
import { Paginator } from './Paginator';

describe('Paginator', () => {
  const renderPaginator = (props: PaginatorProps) => {
    const rendered = render(<Paginator {...props} />);
    const { getByLabelText, getByRole } = rendered;
    const nextPage = getByLabelText('next page') as HTMLButtonElement;
    const prevPage = getByLabelText('previous page') as HTMLButtonElement;
    const currentPageButton = getByRole('button', {
      current: true,
    }) as HTMLButtonElement;
    return { ...rendered, nextPage, prevPage, currentPageButton };
  };

  const cb = vi.fn((page: number) => page);

  it('1 page', () => {
    const { nextPage, prevPage, currentPageButton } = renderPaginator({
      currentPage: 1,
      pageCount: 1,
    });
    expect(nextPage.disabled).toBe(true);
    expect(prevPage.disabled).toBe(true);
    expect(currentPageButton.innerHTML).toBe('1');
  });

  it('10 pages without dots', () => {
    const pageCount = 10;
    const currentPage = 9;
    const { nextPage, prevPage, currentPageButton, getByRole } =
      renderPaginator({
        currentPage,
        pageCount,
        siblingCount: pageCount,
        onChangePage: cb,
      });

    expect(nextPage.disabled).toBe(false);
    expect(prevPage.disabled).toBe(false);
    expect(currentPageButton.innerHTML).toBe('9');

    fireEvent.click(prevPage);
    fireEvent.click(nextPage);

    expect(cb).toHaveNthReturnedWith(1, 8);
    expect(cb).toHaveNthReturnedWith(2, 10);

    for (let page = 1; page <= pageCount; page++) {
      const numberPageButton = getByRole('button', {
        name: `page ${page}`,
      });
      expect(numberPageButton).toBeInTheDocument();
      if (page === currentPage) expect(numberPageButton).toBeDisabled();
      else {
        expect(numberPageButton).toBeEnabled();
        fireEvent.click(numberPageButton);
        expect(cb).toHaveLastReturnedWith(page);
      }
      expect(numberPageButton).toHaveTextContent(`${page}`);
    }
  });

  it('10 with 2 dot segments', () => {
    const pageCount = 10;
    const currentPage = 5;
    const { getAllByText } = renderPaginator({
      currentPage,
      pageCount,
      siblingCount: 0,
      onChangePage: cb,
    });

    const dotElements = getAllByText('...');
    expect(dotElements.length).toBe(2);
  });
});
