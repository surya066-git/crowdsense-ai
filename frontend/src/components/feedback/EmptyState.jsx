import { Typography } from '@mui/material';
import { FiInbox } from 'react-icons/fi';
import { SecondaryButton } from '../common/SecondaryButton.jsx';

export function EmptyState({ title = 'Nothing to show yet', message, actionLabel, onAction }) {
  return (
    <section className="feedback-state">
      <FiInbox className="feedback-state-icon" aria-hidden="true" />
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {message ? (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      ) : null}
      {actionLabel ? <SecondaryButton onClick={onAction}>{actionLabel}</SecondaryButton> : null}
    </section>
  );
}
