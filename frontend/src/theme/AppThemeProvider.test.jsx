import React from 'react';
import { render } from '@testing-library/react';
import { AppThemeProvider } from './AppThemeProvider';
import { useTheme } from '@mui/material/styles';

const TestComponent = () => {
  const theme = useTheme();
  return <div data-testid="theme-mode">{theme.palette.mode}</div>;
};

describe('AppThemeProvider', () => {
  it('provides the light theme by default', () => {
    const { getByTestId } = render(
      <AppThemeProvider>
        <TestComponent />
      </AppThemeProvider>
    );

    expect(getByTestId('theme-mode').textContent).toBe('light');
  });
});
