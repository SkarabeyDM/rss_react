import { Paths, Themes } from '@shared/const';
import { ThemeContext } from '@shared/themes/ThemeContext';
import { toggle } from '@shared/utils';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

export function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <header className={style.header} data-testid="header">
      <nav>
        <ul className={style.navList}>
          <li>
            <NavLink to={Paths.Main}>Home</NavLink>
          </li>
          <li>
            <NavLink to={Paths.Search}>Search</NavLink>
          </li>
          <li>
            <NavLink to={Paths.NotFound}>404</NavLink>
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
