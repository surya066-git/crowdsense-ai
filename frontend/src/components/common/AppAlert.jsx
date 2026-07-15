import { Alert } from '@mui/material';
import { forwardRef } from 'react';

export const AppAlert = forwardRef(function AppAlert(
  { children, severity = 'info', onClose, ...props },
  ref,
) {
  return (
    <Alert ref={ref} className="app-alert" severity={severity} variant="filled" onClose={onClose} {...props}>
      {children}
    </Alert>
  );
});
