import { fireEvent, render } from '@testing-library/react';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { ErrorButton } from './ErrorButton';

describe('ErrorButton', () => {
  const renderErrorButton = () => {
    const rendered = render(
      <ErrorBoundary fallback="error">
        <ErrorButton />
      </ErrorBoundary>
    );

    return { ...rendered, errorButton: rendered.getByRole('button') };
  };
  it('render', async () => {
    const { errorButton, findByText } = renderErrorButton();

    expect(errorButton).toHaveTextContent('Throw Error');

    fireEvent.click(errorButton);
    expect(await findByText('error')).toBeInTheDocument();
  });
});
