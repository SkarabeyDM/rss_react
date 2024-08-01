import { renderWithProviders } from '@src/tests/mocks/utils';
import { App } from './App';

describe('App', () => {
  const renderApp = () => {
    const rendered = renderWithProviders(<App />, { router: false });
    const { getByText } = rendered;
    const mainPage = getByText('[Main Page]');
    return { ...rendered, mainPage };
  };

  it('renders', () => {
    const { mainPage } = renderApp();
    expect(mainPage).toBeInTheDocument();
  });
});
