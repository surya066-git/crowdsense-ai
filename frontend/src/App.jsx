import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AppThemeProvider } from './theme/AppThemeProvider.jsx';
import { AppSnackbarProvider } from './contexts/AppSnackbarContext.jsx';
import { router } from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />
      <AppSnackbarProvider>
        <RouterProvider router={router} />
      </AppSnackbarProvider>
    </AppThemeProvider>
  );
}
