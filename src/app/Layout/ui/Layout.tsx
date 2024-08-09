import { ErrorBoundary } from '@shared/ui/ErrorBoundary';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<div>OOPS!</div>}>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
