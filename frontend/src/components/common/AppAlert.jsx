import PropTypes from 'prop-types';
import { Alert } from '@mui/material';
import { forwardRef } from 'react';

/**
 * A styled alert component wrapping MUI Alert with filled variant.
 * Supports all MUI Alert props via forwarded ref and rest spread.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Alert message content.
 * @param {'error'|'warning'|'info'|'success'} [props.severity='info'] - Alert severity level.
 * @param {Function} [props.onClose] - Callback fired when the alert close button is clicked.
 * @param {React.Ref} ref - Forwarded ref for the Alert element.
 * @returns {JSX.Element} A styled MUI Alert component.
 * @example
 * <AppAlert severity="success" onClose={handleClose}>
 *   File uploaded successfully!
 * </AppAlert>
 */
export const AppAlert = forwardRef(function AppAlert(
  { children, severity = 'info', onClose, ...props },
  ref,
) {
  return (
    <Alert
      ref={ref}
      className="app-alert"
      severity={severity}
      variant="filled"
      onClose={onClose}
      {...props}
    >
      {children}
    </Alert>
  );
});

AppAlert.propTypes = {
  /** Alert message or content */
  children: PropTypes.node.isRequired,
  /** Alert severity level controlling the color and icon */
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  /** Callback fired when the close icon is clicked */
  onClose: PropTypes.func,
};
