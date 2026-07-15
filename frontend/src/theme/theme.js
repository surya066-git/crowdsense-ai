import { createTheme } from '@mui/material/styles';
import { palette } from './palette.js';

const baseTheme = createTheme({
  palette,
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.15,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: 0,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.3,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      letterSpacing: 0,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const lightTheme = createTheme(baseTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${palette.divider}`,
          boxShadow: '0 10px 30px rgba(17, 24, 39, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export const darkTheme = createTheme(lightTheme, {
  palette: {
    mode: 'dark',
    primary: palette.primary,
    secondary: palette.secondary,
    background: {
      default: '#0F172A',
      paper: '#111827',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#CBD5E1',
    },
  },
});
