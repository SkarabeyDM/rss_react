'use client';

import { Paths, Themes } from '@shared/const';
import { ThemeContext } from '@shared/themes/ThemeContext';
import { toggle } from '@shared/utils';
import { useContext } from 'react';
import Link from 'next/link';
import style from './Header.module.scss';

export function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header className={style.header} data-testid="header">
      <nav>
        <ul className={style.navList}>
          <li>
            <Link href={Paths.Main}>Home</Link>
          </li>
          <li>
            <Link href={Paths.Search}>Search</Link>
          </li>
          <li>
            <Link href={Paths.NotFound}>404</Link>
          </li>
        </ul>
      </nav>
      <button
        type="button"
        onClick={() => setTheme(toggle(theme, Themes.DARK, Themes.LIGHT))}
      >
        {theme}
      </button>
    </header>
  );
}
