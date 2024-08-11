import { renderWithProviders } from '@src/tests/mocks/utils';
import { Footer } from './Footer';

describe('Footer', () => {
  const renderFooter = () => renderWithProviders(<Footer />);

  it('rendering content', () => {
    const { getByText } = renderFooter();
    const schoolLink = getByText('Rolling Scopes School') as HTMLLinkElement;
    const creationYear = getByText('2024');
    const authorLink = getByText(/SkarabeyDM/i) as HTMLLinkElement;

    expect(schoolLink).toBeInTheDocument();
    expect(creationYear).toBeInTheDocument();
    expect(authorLink).toBeInTheDocument();
  });
});
