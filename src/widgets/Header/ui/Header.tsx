import { Paths } from '@shared/const';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav>
        <li>
          <NavLink to={Paths.Search}>Search</NavLink>
        </li>
      </nav>
    </header>
  );
}
