import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlternativeCard } from './AlternativeCard';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('AlternativeCard', () => {
  it('renders a fallback message when alternativeGate is not provided', () => {
    renderWithTheme(<AlternativeCard />);
    expect(screen.getByText(/No viable alternative gates currently available./i)).toBeInTheDocument();
  });

  it('renders alternative gate information when provided', () => {
    const alternativeGate = {
      gateName: 'Gate B',
      walkingTimeMins: 5,
      waitingTimeMins: 10,
    };
    renderWithTheme(<AlternativeCard alternativeGate={alternativeGate} />);
    
    expect(screen.getByText('Alternative Route')).toBeInTheDocument();
    expect(screen.getByText('Gate B')).toBeInTheDocument();
    expect(screen.getByText('5 mins')).toBeInTheDocument();
    expect(screen.getByText('10 mins')).toBeInTheDocument();
    expect(screen.getByText(/Selected based on spatial distinctness and low penalty score./i)).toBeInTheDocument();
  });

  it('renders explanation if provided', () => {
    const alternativeGate = {
      gateName: 'Gate B',
      walkingTimeMins: 5,
      waitingTimeMins: 10,
    };
    const explanation = { alternative: 'Custom explanation text' };
    
    renderWithTheme(<AlternativeCard alternativeGate={alternativeGate} explanation={explanation} />);
    expect(screen.getByText(/Custom explanation text/i)).toBeInTheDocument();
  });
});
