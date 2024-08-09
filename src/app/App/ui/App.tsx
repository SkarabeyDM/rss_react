import { router } from '@app/routes';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import { useContext } from 'react';
import { ThemeContext } from '@shared/themes';
import classNames from 'classnames';

export function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classNames('app', theme)}>
      <div className="wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
