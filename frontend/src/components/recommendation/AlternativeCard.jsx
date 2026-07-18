import { Box, Typography, Paper, Stack, useTheme, Divider } from '@mui/material';
import { FiMapPin, FiClock } from 'react-icons/fi';

export function AlternativeCard({ alternativeGate, explanation }) {
  const theme = useTheme();

  if (!alternativeGate) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography color="text.secondary">
          No viable alternative gates currently available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Alternative Route
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        If conditions change, consider this secondary option.
      </Typography>

      <Box sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          mb={2}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <FiMapPin color={theme.palette.text.secondary} />
            {alternativeGate.gateName}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={4} mb={3}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="flex"
              sx={{ alignItems: 'center' }}
              gap={0.5}
            >
              <FiClock /> Walk
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {alternativeGate.walkingTimeMins} mins
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              display="flex"
              sx={{ alignItems: 'center' }}
              gap={0.5}
            >
              <FiClock /> Wait
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {alternativeGate.waitingTimeMins} mins
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', lineHeight: 1.5 }}
        >
          <strong>AI Rationale:</strong>{' '}
          {explanation?.alternative ||
            'Selected based on spatial distinctness and low penalty score.'}
        </Typography>
      </Box>
    </Paper>
  );
}
