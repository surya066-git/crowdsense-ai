import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';
import { AppAlert } from './AppAlert.jsx';

/**
 * A global snackbar notification component combining MUI Snackbar and AppAlert.
 * Automatically hides after 5 seconds.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Whether the snackbar is currently visible.
 * @param {string} props.message - The notification message to display.
 * @param {'error'|'warning'|'info'|'success'} [props.severity='info'] - The alert severity level.
 * @param {Function} props.onClose - Callback fired when the snackbar closes.
 * @returns {JSX.Element} An MUI Snackbar containing an AppAlert.
 * @example
 * <AppSnackbar
 *   open={snackbarOpen}
 *   message="Upload successful!"
 *   severity="success"
 *   onClose={handleClose}
 * />
 */
export function AppSnackbar({ open, message, severity = 'info', onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <AppAlert severity={severity} onClose={onClose}>
        {message}
      </AppAlert>
    </Snackbar>
  );
}

AppSnackbar.propTypes = {
  /** Whether the snackbar is visible */
  open: PropTypes.bool.isRequired,
  /** The notification message text */
  message: PropTypes.string.isRequired,
  /** Alert severity level */
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  /** Callback when the snackbar closes */
  onClose: PropTypes.func.isRequired,
};
