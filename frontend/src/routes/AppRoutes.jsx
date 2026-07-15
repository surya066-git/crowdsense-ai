import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import { publicRoutes } from './routeConfig.jsx';

export const router = createBrowserRouter([
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
]);
