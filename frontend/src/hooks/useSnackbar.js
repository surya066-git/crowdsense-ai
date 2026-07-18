/**
 * @module useSnackbar
 * @description Custom React hook for accessing the global snackbar notification system.
 */

import { useContext } from 'react';
import { AppSnackbarContext } from '../contexts/AppSnackbarContextValue.js';

/**
 * Custom hook that provides access to the application's snackbar notification context.
 * Must be used within a component tree wrapped by `AppSnackbarProvider`.
 * @returns {{ showSnackbar: Function, hideSnackbar: Function }} The snackbar context value.
 * @throws {Error} Will return undefined if used outside of the AppSnackbarProvider.
 * @example
 * const { showSnackbar } = useSnackbar();
 * showSnackbar({ message: 'Upload complete!', severity: 'success' });
 */
export const useSnackbar = () => useContext(AppSnackbarContext);
