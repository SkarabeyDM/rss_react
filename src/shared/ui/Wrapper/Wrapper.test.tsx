import { renderWithProviders } from '@tests/mocks';
import { Wrapper } from './Wrapper';

describe('App', () => {
  const renderApp = () => {
    const rendered = renderWithProviders(<Wrapper />);
    return { ...rendered };
  };

  it('renders', () => {
    const { baseElement } = renderApp();
    expect(baseElement.querySelector('.app')).toBeInTheDocument();
    expect(baseElement.querySelector('.wrapper')).toBeInTheDocument();
  });
});
