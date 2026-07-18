import { Typography, Paper, Grid, Button, Stack, useTheme } from '@mui/material';
import { FiUsers, FiAlertCircle, FiCloudRain, FiShieldOff, FiRefreshCcw } from 'react-icons/fi';

function ActionButton({ icon, label, color, onClick }) {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
      fullWidth
      sx={{
        bgcolor: `${color}.main`,
        color: `${color}.contrastText`,
        py: 1.5,
        '&:hover': { bgcolor: `${color}.dark` },
      }}
    >
      {label}
    </Button>
  );
}

export function ControlPanel({ onTriggerEvent, onReset }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}` }}
    >
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }} mb={3}>
        <Typography variant="h6" fontWeight={700}>
          Simulation Controls
        </Typography>
        <Button
          startIcon={<FiRefreshCcw />}
          onClick={onReset}
          size="small"
          color="error"
          variant="outlined"
        >
          Reset Stadium
        </Button>
      </Stack>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Crowd Dynamics
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid xs={6}>
          <ActionButton
            icon={<FiUsers />}
            label="Surge Crowd (+1000)"
            color="primary"
            onClick={() => onTriggerEvent('CROWD', 'INCREASE')}
          />
        </Grid>
        <Grid xs={6}>
          <ActionButton
            icon={<FiUsers />}
            label="Reduce Crowd (-1000)"
            color="secondary"
            onClick={() => onTriggerEvent('CROWD', 'DECREASE')}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Gate Operations (Gate A)
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid xs={6}>
          <ActionButton
            icon={<FiShieldOff />}
            label="Emergency Close"
            color="error"
            onClick={() => onTriggerEvent('GATE', 'CLOSE', 'gate_a')}
          />
        </Grid>
        <Grid xs={6}>
          <ActionButton
            icon={<FiRefreshCcw />}
            label="Reopen Gate"
            color="success"
            onClick={() => onTriggerEvent('GATE', 'OPEN', 'gate_a')}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Incidents & Weather
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <ActionButton
            icon={<FiAlertCircle />}
            label="Medical"
            color="warning"
            onClick={() => onTriggerEvent('INCIDENT', 'MEDICAL', 'gate_a')}
          />
        </Grid>
        <Grid xs={4}>
          <ActionButton
            icon={<FiAlertCircle />}
            label="Security"
            color="error"
            onClick={() => onTriggerEvent('INCIDENT', 'SECURITY', 'gate_b')}
          />
        </Grid>
        <Grid xs={4}>
          <ActionButton
            icon={<FiCloudRain />}
            label="Heavy Rain"
            color="info"
            onClick={() => onTriggerEvent('WEATHER', 'STORM')}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
