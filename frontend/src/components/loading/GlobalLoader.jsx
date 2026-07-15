import { Box, CircularProgress, Typography } from '@mui/material';

export function GlobalLoader({ label = 'Loading CrowdSense AI' }) {
  return (
    <Box className="global-loader" role="status" aria-live="polite">
      <CircularProgress size={34} />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );
}
