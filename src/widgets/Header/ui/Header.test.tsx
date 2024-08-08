import { renderWithProviders } from '@src/tests/mocks/utils';
import { Themes } from '@shared/const';
import { fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  const renderHeader = () => renderWithProviders(<Header />, { router: {} });

  it('nav list', () => {
    const { getByText } = renderHeader();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('404')).toBeInTheDocument();
  });

  it('toggle theme button', async () => {
    const { getByText, findByText } = renderHeader();
    const button = getByText(Themes.DARK);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(await findByText(Themes.LIGHT)).toBeInTheDocument();
    fireEvent.click(button);
    expect(await findByText(Themes.DARK)).toBeInTheDocument();
  });
});
