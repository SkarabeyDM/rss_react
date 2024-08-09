import { renderWithProviders } from '@src/tests/mocks/utils';
import { add } from '@shared/store/slices/cardListSlice';
import { r2d2 } from '@src/tests/mocks/people';
import { act, fireEvent } from '@testing-library/react';
import { SelectionMenu } from './SelectionMenu';

describe('SelectionMenu', () => {
  const renderSelectionMenu = () => {
    const rendered = renderWithProviders(<SelectionMenu />);
    const { getByRole } = rendered;
    const unselectAllButton = getByRole('button', { name: 'Unselect all' });
    const downloadLink = getByRole('link', {
      name: 'Download selected',
    });

    return { ...rendered, unselectAllButton, downloadLink };
  };

  it('render default', () => {
    const { unselectAllButton, downloadLink } = renderSelectionMenu();

    expect(unselectAllButton).toHaveTextContent('Unselect All');
    expect(downloadLink).toHaveTextContent('Download (0)');
  });

  it('render with changing state', () => {
    const { unselectAllButton, downloadLink, store } = renderSelectionMenu();

    act(() => {
      store.dispatch(add(r2d2));
    });

    expect(downloadLink).toHaveTextContent('Download (1)');

    act(() => {
      fireEvent.click(unselectAllButton);
    });

    expect(downloadLink).toHaveTextContent('Download (0)');
  });
});
