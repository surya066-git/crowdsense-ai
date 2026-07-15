import { FiClock, FiCompass, FiHome, FiInfo, FiLogIn, FiMap, FiUploadCloud } from 'react-icons/fi';
import { ROUTE_PATHS } from './appConstants.js';

export const PRIMARY_NAVIGATION = Object.freeze([
  {
    label: 'Home',
    path: ROUTE_PATHS.HOME,
    icon: FiHome,
  },
  {
    label: 'Upload',
    path: ROUTE_PATHS.UPLOAD,
    icon: FiUploadCloud,
  },
  {
    label: 'Map',
    path: ROUTE_PATHS.MAP,
    icon: FiMap,
  },
  {
    label: 'Recommendation',
    path: ROUTE_PATHS.RECOMMENDATION,
    icon: FiCompass,
  },
  {
    label: 'History',
    path: ROUTE_PATHS.HISTORY,
    icon: FiClock,
  },
  {
    label: 'About',
    path: ROUTE_PATHS.ABOUT,
    icon: FiInfo,
  },
]);

export const UTILITY_NAVIGATION = Object.freeze([
  {
    label: 'Login',
    path: ROUTE_PATHS.LOGIN,
    icon: FiLogIn,
  },
]);
