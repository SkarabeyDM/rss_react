import { fireEvent, render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { SearchForm } from '../ui/SearchForm';
import { MemoryRouter } from 'react-router-dom';

const customRender = (initialEntries?: string[]) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <SearchForm />
    </MemoryRouter>
  );

describe('SearchForm', () => {
  test('Rendering', () => {
    const { getByTestId } = customRender();
    expect(getByTestId('SearchForm')).toBeInTheDocument();
    expect(getByTestId('SearchForm__text-input')).toBeInTheDocument();
    expect(getByTestId('SearchForm__button')).toBeInTheDocument();
  });
  test('If the query string contains "search" parameter, use it\'s value as default value', async () => {
    const searchParam = 'sus';
    const { findByDisplayValue } = customRender([`?search=${searchParam}`]);
    expect(await findByDisplayValue(searchParam)).toBeInTheDocument();
  });
  test('Change value', async () => {
    const searchInput = 'sus';
    const { getByTestId } = customRender();
    const input = getByTestId('SearchForm__text-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: searchInput } });
    expect(input.value).toBe(searchInput);
  });
  test('Submit value', async () => {
    const { getByTestId } = customRender();
    const submitButton = getByTestId('SearchForm__button') as HTMLInputElement;
    fireEvent.click(submitButton);
  });
});
