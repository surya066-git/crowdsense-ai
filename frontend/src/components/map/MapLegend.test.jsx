import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { MapLegend } from './MapLegend';

describe('MapLegend', () => {
  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  };

  it('renders without crashing', () => {
    renderWithTheme(<MapLegend />);
    expect(screen.getByText('Legend')).toBeInTheDocument();
  });

  it('renders all legend items', () => {
    renderWithTheme(<MapLegend />);
    expect(screen.getByText('Low Crowd')).toBeInTheDocument();
    expect(screen.getByText('Medium Crowd')).toBeInTheDocument();
    expect(screen.getByText('High Crowd')).toBeInTheDocument();
    expect(screen.getByText('Very High Crowd')).toBeInTheDocument();
    expect(screen.getByText('Open Gate')).toBeInTheDocument();
    expect(screen.getByText('Closed Gate')).toBeInTheDocument();
    expect(screen.getByText('Incident')).toBeInTheDocument();
  });
});
