import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import { publicRoutes } from './routeConfig.jsx';

const basename =
  import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        ...publicRoutes,
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  { basename },
);
