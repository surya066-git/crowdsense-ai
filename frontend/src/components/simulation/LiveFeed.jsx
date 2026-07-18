import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { FiActivity, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export function LiveFeed({ events }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Live Activity Feed
      </Typography>

      {events.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Waiting for simulation events...
        </Typography>
      ) : (
        <List>
          {events.map((event, idx) => (
            <ListItem key={idx} disableGutters sx={{ alignItems: 'flex-start', mb: 1 }}>
              <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                {event.type === 'ERROR' ? (
                  <FiAlertTriangle color={theme.palette.error.main} />
                ) : event.type === 'WARNING' ? (
                  <FiAlertTriangle color={theme.palette.warning.main} />
                ) : (
                  <FiActivity color={theme.palette.primary.main} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={event.message}
                secondary={event.time}
                primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
