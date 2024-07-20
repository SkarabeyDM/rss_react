import { Layout } from '@app/Layout';
import { Paths } from '@shared/const';
import { CardDetailed } from '@shared/ui/CardDetailed';
import { Search } from '@src/views/Search';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      path: Paths.Main,
      element: <Layout />,
      children: [
        { path: Paths.Main, element: '[Main Page]' },
        { path: Paths.NotFound, element: 404 },
        {
          path: `${Paths.Search}/:q?`,
          element: <Search />,
          children: [{ path: '', element: <CardDetailed /> }],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
