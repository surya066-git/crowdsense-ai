import { Snackbar } from '@mui/material';
import { AppAlert } from './AppAlert.jsx';

export function AppSnackbar({ open, message, severity = 'info', onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <AppAlert severity={severity} onClose={onClose}>
        {message}
      </AppAlert>
    </Snackbar>
  );
}
