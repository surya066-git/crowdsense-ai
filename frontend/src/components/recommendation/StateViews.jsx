import { Box, Typography, Button, Paper, CircularProgress, Stack, useTheme, Skeleton, Grid } from '@mui/material';
import { FiAlertTriangle, FiMap, FiRefreshCcw } from 'react-icons/fi';

export function LoadingState() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Stack spacing={3} sx={{ alignItems: 'center' }} mb={6}>
        <CircularProgress size={48} thickness={4} />
        <Typography variant="h6" color="text.secondary">AI Decision Engine is calculating the optimal route...</Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Skeleton variant="rounded" height={300} sx={{ borderRadius: 4, mb: 3 }} />
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4 }} />
        </Grid>
        <Grid xs={12} md={4}>
          <Skeleton variant="rounded" height={150} sx={{ borderRadius: 4, mb: 3 }} />
          <Skeleton variant="rounded" height={350} sx={{ borderRadius: 4 }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export function ErrorState({ message, onRetry }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', p: 3 }}>
      <Paper elevation={0} sx={{ p: 6, borderRadius: 4, border: `1px solid ${theme.palette.error.light}`, bgcolor: 'error.50', textAlign: 'center', maxWidth: 500 }}>
        <FiAlertTriangle size={64} color={theme.palette.error.main} style={{ marginBottom: 16 }} />
        <Typography variant="h5" fontWeight={700} color="error.dark" gutterBottom>
          Recommendation Failed
        </Typography>
        <Typography variant="body1" color="error.main" mb={4}>
          {message || 'The AI Decision Engine encountered an error or all gates are currently marked unsafe.'}
        </Typography>
        <Button variant="contained" color="error" startIcon={<FiRefreshCcw />} onClick={onRetry} sx={{ borderRadius: '50px', px: 4 }}>
          Retry Request
        </Button>
      </Paper>
    </Box>
  );
}

export function EmptyState({ onGenerate }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', p: 3 }}>
      <Paper elevation={0} sx={{ p: 6, borderRadius: 4, border: `1px dashed ${theme.palette.divider}`, textAlign: 'center', maxWidth: 600 }}>
        <Box sx={{ bgcolor: 'primary.50', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
          <FiMap size={40} color={theme.palette.primary.main} />
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Ready for Routing
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The AI Decision Engine is standing by. Generate a recommendation to see the optimal, safest gate for your stadium entry based on real-time data.
        </Typography>
        <Button variant="contained" size="large" onClick={onGenerate} sx={{ borderRadius: '50px', px: 4, py: 1.5, fontSize: '1.1rem' }}>
          Generate Recommendation
        </Button>
      </Paper>
    </Box>
  );
}
