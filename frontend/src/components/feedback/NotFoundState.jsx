import { Typography } from '@mui/material';
import { FiMapPin } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/appConstants.js';
import { PrimaryButton } from '../common/PrimaryButton.jsx';

export function NotFoundState() {
  return (
    <section className="feedback-state">
      <FiMapPin className="feedback-state-icon" aria-hidden="true" />
      <Typography variant="h4" component="h1">
        Page not found
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The requested route is not available.
      </Typography>
      <PrimaryButton component={RouterLink} to={ROUTE_PATHS.HOME}>
        Go home
      </PrimaryButton>
    </section>
  );
}
