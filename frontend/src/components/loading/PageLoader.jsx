import { LinearProgress, Typography } from '@mui/material';

export function PageLoader({ label = 'Preparing page' }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <LinearProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </div>
  );
}
