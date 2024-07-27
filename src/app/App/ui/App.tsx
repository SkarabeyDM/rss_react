import { router } from '@app/routes';
import { RouterProvider } from 'react-router-dom';
import './App.scss';

export function App() {
  return <RouterProvider router={router} />;
}
