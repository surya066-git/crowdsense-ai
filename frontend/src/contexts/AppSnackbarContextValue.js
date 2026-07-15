import { createContext } from 'react';

export const AppSnackbarContext = createContext({
  showSnackbar: () => {},
  closeSnackbar: () => {},
});
