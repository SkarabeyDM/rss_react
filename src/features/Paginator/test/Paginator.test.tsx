import '@testing-library/react/dont-cleanup-after-each';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Paginator, PaginatorProps } from '../ui/Paginator';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SearchContextProvider } from '../../../shared/сontext';

type CustomRenderOptions = {
  router: MemoryRouterProps;
};

type PaginatorPropsDictionary = Record<string, PaginatorProps>;

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = { router: {} }
) =>
  render(
    <MemoryRouter {...options.router}>
      <SearchContextProvider>{ui}</SearchContextProvider>
    </MemoryRouter>
  );

const props: PaginatorPropsDictionary = {
  normal: {
    totalCount: 2,
    page: 1,
    pageSize: 1,
  },
  singlePage: {
    totalCount: 1,
    page: 1,
    pageSize: 1,
  },
};

describe('Paginator', () => {
  describe('Basic props', () => {
    test('Current page is correct', () => {
      customRender(<Paginator {...props.normal} />);
      expect(screen.getByTestId('pageNumber')).toHaveTextContent('1');
    });
    test('If only 1 page', () => {
      const { container } = customRender(<Paginator {...props.singlePage} />);
      expect(container).toBeEmptyDOMElement();
    });
  });
  describe('Functionality', () => {
    test('Button clicks', async () => {
      customRender(<Paginator {...props.normal} />);
      await userEvent.click(screen.getByTestId('button-last'));
    });
  });
});
