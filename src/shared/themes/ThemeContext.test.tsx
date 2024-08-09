import { fireEvent, render } from '@testing-library/react';
import { Themes } from '@shared/const';
import { useContext } from 'react';
import { toggle } from '@shared/utils';
import { ThemeContext, ThemeProvider } from './ThemeContext';

describe('ThemeContext', () => {
  function ToggleThemeButton() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
      <button
        type="button"
        onClick={() => setTheme(toggle(theme, Themes.DARK, Themes.LIGHT))}
        data-testid="button"
      >
        {theme}
      </button>
    );
  }

  const renderThemeContext = () =>
    render(
      <ThemeProvider>
        <ToggleThemeButton />
      </ThemeProvider>
    );

  it('toggle theme', async () => {
    const { findByText, getByTestId } = renderThemeContext();
    const button = getByTestId('button');

    expect(button.innerHTML).toBe(Themes.DARK);
    fireEvent.click(button);
    expect(await findByText(Themes.LIGHT)).toBeInTheDocument();
    fireEvent.click(button);
    expect(await findByText(Themes.DARK)).toBeInTheDocument();
  });
});
