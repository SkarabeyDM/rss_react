import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';
import 'normalize.css';
import { BrowserRouter } from 'react-router-dom';
import packageJson from '../package.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={packageJson.homepage}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
