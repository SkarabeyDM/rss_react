import { renderWithProviders } from '@src/tests/mocks/utils';
import { fireEvent } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  const renderSearchInput = () => {
    const rendered = renderWithProviders(<SearchInput />, { router: {} });
    const { getByRole, getByLabelText } = rendered;
    const inputElement = getByLabelText('Search input') as HTMLInputElement;
    const buttonElement = getByRole('button') as HTMLButtonElement;
    const formElement = rendered.baseElement as HTMLFormElement;
    return { ...rendered, inputElement, buttonElement, formElement };
  };

  it('change value', () => {
    const { inputElement, buttonElement, formElement } = renderSearchInput();
    const input = '     abc     ';

    expect(buttonElement).toHaveTextContent('Search');
    expect(inputElement).toHaveValue('');

    fireEvent.change(inputElement, { target: { value: input } });
    expect(inputElement).toHaveValue(input);

    fireEvent.submit(formElement);
    expect(inputElement).toHaveValue(input);
  });
});
