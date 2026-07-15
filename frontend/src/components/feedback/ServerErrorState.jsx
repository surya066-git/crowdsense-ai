import { Typography } from '@mui/material';
import { FiAlertTriangle } from 'react-icons/fi';
import { SecondaryButton } from '../common/SecondaryButton.jsx';

export function ServerErrorState({ onRetry }) {
  return (
    <section className="feedback-state">
      <FiAlertTriangle className="feedback-state-icon" aria-hidden="true" />
      <Typography variant="h5" component="h2">
        Service issue
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Something went wrong while preparing the page.
      </Typography>
      {onRetry ? <SecondaryButton onClick={onRetry}>Retry</SecondaryButton> : null}
    </section>
  );
}
