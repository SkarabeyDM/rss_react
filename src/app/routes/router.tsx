import { Layout } from '@app/Layout';
import { Paths } from '@shared/const';
import { Search } from '@src/views/Search';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      path: Paths.Main,
      element: <Layout />,
      children: [{ path: `/:q?`, element: <Search /> }],
    },
    { path: '/*', element: 404 },
  ],
  { basename: import.meta.env.BASE_URL }
);

console.log(router);
