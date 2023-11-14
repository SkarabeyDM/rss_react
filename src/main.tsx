import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import packageJson from '../package.json';
import './index.scss';
import 'normalize.css';

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import('./mocks/browser.js');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    serviceWorker: { url: `${packageJson.homepage}/mockServiceWorker.js` },
  });
}
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
