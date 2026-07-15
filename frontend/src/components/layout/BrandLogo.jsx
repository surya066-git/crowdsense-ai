import { Link as RouterLink } from 'react-router-dom';
import { FiNavigation } from 'react-icons/fi';
import { ROUTE_PATHS } from '../../constants/appConstants.js';

export function BrandLogo() {
  return (
    <RouterLink className="brand-logo" to={ROUTE_PATHS.HOME} aria-label="CrowdSense AI home">
      <span className="brand-logo-mark">
        <FiNavigation aria-hidden="true" />
      </span>
      <span className="brand-logo-text">CrowdSense AI</span>
    </RouterLink>
  );
}
