import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './theme.js';

export function AppThemeProvider({ children }) {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
}
