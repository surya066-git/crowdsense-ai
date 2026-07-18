import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroCard } from './HeroCard';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('HeroCard', () => {
  it('renders hero card with data', () => {
    const data = {
      bestGate: {
        gateName: 'Gate A',
        walkingTimeMins: 15,
        waitingTimeMins: 3,
      },
      safetyScore: 95,
      confidenceScore: 88,
    };
    renderWithTheme(<HeroCard data={data} />);
    
    expect(screen.getByText('Gate A')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('88')).toBeInTheDocument();
    expect(screen.getByText('15 mins')).toBeInTheDocument();
    expect(screen.getByText('3 mins')).toBeInTheDocument();
  });
});
