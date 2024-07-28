import { router } from '@app/routes';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { ThemeProvider } from '@shared/themes';

export function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <div className="wrapper">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}
