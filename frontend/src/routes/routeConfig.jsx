/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { ROUTE_PATHS } from '../constants/appConstants.js';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const UploadPage = lazy(() => import('../pages/UploadPage.jsx'));
const MapPage = lazy(() => import('../pages/MapPage.jsx'));
const RecommendationPage = lazy(() => import('../pages/RecommendationPage.jsx'));
const SimulationPage = lazy(() => import('../pages/SimulationPage.jsx'));
const HistoryPage = lazy(() => import('../pages/HistoryPage.jsx'));
const AboutPage = lazy(() => import('../pages/AboutPage.jsx'));
const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
export const publicRoutes = Object.freeze([
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
    index: true,
  },
  {
    path: ROUTE_PATHS.ABOUT,
    element: <AboutPage />,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
]);

export const protectedRoutes = Object.freeze([
  {
    path: ROUTE_PATHS.UPLOAD,
    element: <UploadPage />,
  },
  {
    path: ROUTE_PATHS.MAP,
    element: <MapPage />,
  },
  {
    path: ROUTE_PATHS.RECOMMENDATION,
    element: <RecommendationPage />,
  },
  {
    path: ROUTE_PATHS.SIMULATION,
    element: <SimulationPage />,
  },
  {
    path: ROUTE_PATHS.HISTORY,
    element: <HistoryPage />,
  },
]);
