import { StrictMode } from 'react';
import './App.scss';
import { AppRoutes } from './app/api/Routes';
import { HashRouter } from 'react-router-dom';

export function App() {
  return (
    <StrictMode>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </StrictMode>
  );
}
