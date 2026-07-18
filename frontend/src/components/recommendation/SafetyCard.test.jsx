import React from 'react';
import { render, screen } from '@testing-library/react';
import { SafetyCard } from './SafetyCard';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('SafetyCard', () => {
  it('returns null if no explanation is provided', () => {
    const { container } = renderWithTheme(<SafetyCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renders safety card for HIGH risk', () => {
    const explanation = {
      riskLevel: 'HIGH',
      safetyTips: ['Tip 1', 'Tip 2'],
    };
    renderWithTheme(<SafetyCard explanation={explanation} />);
    
    expect(screen.getByText('Safety Summary')).toBeInTheDocument();
    expect(screen.getByText('Risk: HIGH')).toBeInTheDocument();
    expect(screen.getByText(/Proceed with extreme caution/i)).toBeInTheDocument();
    expect(screen.getByText('Tip 1')).toBeInTheDocument();
    expect(screen.getByText('Tip 2')).toBeInTheDocument();
  });

  it('renders safety card for SAFE (unknown/low) risk', () => {
    const explanation = {
      riskLevel: 'LOW',
    };
    renderWithTheme(<SafetyCard explanation={explanation} />);
    
    expect(screen.getByText('Risk: LOW')).toBeInTheDocument();
    expect(screen.getByText(/Current route is assessed as safe/i)).toBeInTheDocument();
  });
});
