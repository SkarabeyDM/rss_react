import { StrictMode } from 'react';
import './App.scss';
import { AppRoutes } from './app/api/Routes';
import { BrowserRouter } from 'react-router-dom';
import packageJson from '../package.json';

export function App() {
  return (
    <StrictMode>
      <BrowserRouter basename={packageJson.homepage}>
        <AppRoutes />
      </BrowserRouter>
    </StrictMode>
  );
}
