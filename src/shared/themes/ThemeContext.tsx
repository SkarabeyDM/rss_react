import { Themes } from '@shared/const';
import { useLocalStorage } from '@shared/hooks';
import type { PropsWithChildren } from 'react';
import { createContext, useMemo } from 'react';

export const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: Themes.DARK,
  setTheme: () => {},
});

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage('theme', Themes.DARK);
  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          theme,
          setTheme,
        }),
        [theme]
      )}
    >
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
