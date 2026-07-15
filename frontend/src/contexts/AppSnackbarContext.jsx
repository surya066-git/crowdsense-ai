import { useMemo, useState, useContext } from 'react';
import { AppSnackbar } from '../components/common/AppSnackbar.jsx';
import { AppSnackbarContext } from './AppSnackbarContextValue.js';

export const useSnackbar = () => {
  return useContext(AppSnackbarContext);
};

export function AppSnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const value = useMemo(
    () => ({
      showSnackbar(message, severity = 'info') {
        setSnackbar({
          open: true,
          message,
          severity,
        });
      },
      closeSnackbar() {
        setSnackbar((currentValue) => ({
          ...currentValue,
          open: false,
        }));
      },
    }),
    [],
  );

  return (
    <AppSnackbarContext.Provider value={value}>
      {children}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={value.closeSnackbar}
      />
    </AppSnackbarContext.Provider>
  );
}
