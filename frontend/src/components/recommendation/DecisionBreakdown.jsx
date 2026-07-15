import { Box, Typography, Paper, Stack, LinearProgress, useTheme } from '@mui/material';

export function DecisionBreakdown({ explainabilityMatrix, bestGateId }) {
  const theme = useTheme();
  
  const factors = explainabilityMatrix?.[bestGateId] || {};

  const getSeverityValue = (text) => {
    if (text === 'Severe' || text === 'CRITICAL' || text === 'HIGH') return { value: 90, color: 'error' };
    if (text === 'Moderate' || text === 'MEDIUM') return { value: 50, color: 'warning' };
    if (text === 'Low' || text === 'None' || text === 'LOW') return { value: 15, color: 'success' };
    if (text === 'Far') return { value: 80, color: 'warning' };
    if (text === 'Favorable') return { value: 20, color: 'success' };
    return { value: 0, color: 'primary' };
  };

  const renderFactor = (label, valueText) => {
    const { value, color } = getSeverityValue(valueText);
    return (
      <Box mb={2}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }} mb={0.5}>
          <Typography variant="body2" fontWeight={600}>{label}</Typography>
          <Typography variant="caption" color={`${color}.main`} fontWeight={700}>{valueText}</Typography>
        </Stack>
        <LinearProgress variant="determinate" value={value} color={color} sx={{ height: 6, borderRadius: 3 }} />
      </Box>
    );
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>Technical Breakdown</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Engine scoring impact visualization for the primary recommendation.
      </Typography>
      
      {factors.crowdImpact && renderFactor('Crowd Density Impact', factors.crowdImpact)}
      {factors.distanceImpact && renderFactor('Distance Impact', factors.distanceImpact)}
      {factors.incidentProximity && renderFactor('Incident Proximity', factors.incidentProximity)}
      
      {!factors.crowdImpact && (
        <Typography variant="body2" color="text.secondary">No technical factors available.</Typography>
      )}
    </Paper>
  );
}
