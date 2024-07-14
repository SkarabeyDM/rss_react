import './App.css';
import { Search } from '@src/views/Search';
import { ErrorBoundary } from '@shared/ui/ErrorBoundary';

export function App() {
  return (
    <main>
      <ErrorBoundary fallback={<div>OOPS!</div>}>
        <Search />
      </ErrorBoundary>
    </main>
  );
}
