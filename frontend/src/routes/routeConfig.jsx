import { ROUTE_PATHS } from '../constants/appConstants.js';
import HomePage from '../pages/HomePage.jsx';
import UploadPage from '../pages/UploadPage.jsx';
import MapPage from '../pages/MapPage.jsx';
import RecommendationPage from '../pages/RecommendationPage.jsx';
import SimulationPage from '../pages/SimulationPage.jsx';
import HistoryPage from '../pages/HistoryPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';

export const publicRoutes = Object.freeze([
  {
    path: ROUTE_PATHS.HOME,
    element: <HomePage />,
    index: true,
  },
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
  {
    path: ROUTE_PATHS.ABOUT,
    element: <AboutPage />,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    element: <LoginPage />,
  },
]);
