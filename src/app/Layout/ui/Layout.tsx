import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <ErrorBoundary fallback={<div>OOPS!</div>}>
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  );
}
