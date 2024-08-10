import { renderWithProviders } from '@src/tests/mocks/utils';
import type { Router } from 'next/router';
import { App } from './App';

describe('App', () => {
  const renderApp = () => {
    const rendered = renderWithProviders(
      <App pageProps={{}} Component={() => 'test'} router={{} as Router} />
    );
    const { getByText } = rendered;
    const mainPage = getByText('test');
    return { ...rendered, mainPage };
  };

  it('renders', () => {
    const { mainPage, baseElement } = renderApp();
    expect(baseElement.querySelector('.app')).toBeInTheDocument();
    expect(baseElement.querySelector('.wrapper')).toBeInTheDocument();
    expect(mainPage).toBeInTheDocument();
  });
});
