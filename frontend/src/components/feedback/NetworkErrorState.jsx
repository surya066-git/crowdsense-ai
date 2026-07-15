import { Typography } from '@mui/material';
import { FiWifiOff } from 'react-icons/fi';
import { SecondaryButton } from '../common/SecondaryButton.jsx';

export function NetworkErrorState({ onRetry }) {
  return (
    <section className="feedback-state">
      <FiWifiOff className="feedback-state-icon" aria-hidden="true" />
      <Typography variant="h5" component="h2">
        Network unavailable
      </Typography>
      <Typography variant="body2" color="text.secondary">
        The app could not reach the service.
      </Typography>
      {onRetry ? <SecondaryButton onClick={onRetry}>Try again</SecondaryButton> : null}
    </section>
  );
}
