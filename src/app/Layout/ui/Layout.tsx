import { Paths } from '@shared/const';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { NavLink, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <header>
        <NavLink to={Paths.Search}>Search</NavLink>
      </header>
      <ErrorBoundary fallback={<div>OOPS!</div>}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
}
