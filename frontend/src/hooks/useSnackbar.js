import { useContext } from 'react';
import { AppSnackbarContext } from '../contexts/AppSnackbarContextValue.js';

export const useSnackbar = () => useContext(AppSnackbarContext);
