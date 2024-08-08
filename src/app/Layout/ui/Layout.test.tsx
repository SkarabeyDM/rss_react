import { renderWithProviders } from '@src/tests/mocks/utils';
import { Layout } from './Layout';

describe('Layout', () => {
  const renderLayout = () => {
    const rendered = renderWithProviders(<Layout />, { router: {} });
    const { getByTestId } = rendered;
    const header = getByTestId('header');
    const footer = getByTestId('footer');

    return { ...rendered, header, footer };
  };

  it('render', () => {
    const { header, footer } = renderLayout();

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
