import { Box, Typography, Paper, Stack, useTheme, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiShield, FiAlertOctagon } from 'react-icons/fi';

export function SafetyCard({ explanation }) {
  const theme = useTheme();

  if (!explanation) return null;

  const riskLevel = explanation.riskLevel || 'UNKNOWN';
  
  const getRiskProps = () => {
    if (riskLevel === 'HIGH') return { color: 'error', bg: 'error.50', icon: <FiAlertOctagon /> };
    if (riskLevel === 'MEDIUM') return { color: 'warning', bg: 'warning.50', icon: <FiAlertOctagon /> };
    return { color: 'success', bg: 'success.50', icon: <FiShield /> };
  };

  const props = getRiskProps();

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between',  alignItems: 'center' }} mb={3}>
        <Typography variant="h6" fontWeight={700}>Safety Summary</Typography>
        <Chip label={`Risk: ${riskLevel}`} color={props.color} size="small" sx={{ fontWeight: 700 }} />
      </Stack>

      <Box sx={{ bgcolor: props.bg, p: 2, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box sx={{ color: `${props.color}.main` }}>
            {props.icon}
          </Box>
          <Typography variant="body2" color={`${props.color}.dark`} fontWeight={600}>
            {riskLevel === 'HIGH' ? 'Proceed with extreme caution. Follow stadium staff instructions.' : 'Current route is assessed as safe based on available telemetry.'}
          </Typography>
        </Stack>
      </Box>

      {explanation.safetyTips && explanation.safetyTips.length > 0 && (
        <Box>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>AI Safety Tips</Typography>
          <List dense disablePadding>
            {explanation.safetyTips.map((tip, idx) => (
              <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>•</ListItemIcon>
                <ListItemText primary={tip} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
}
