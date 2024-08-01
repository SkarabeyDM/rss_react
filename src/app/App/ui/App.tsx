import { router } from '@app/routes';
import { RouterProvider } from 'react-router-dom';
import './App.scss';

export function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
