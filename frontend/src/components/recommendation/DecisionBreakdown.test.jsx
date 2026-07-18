import React from 'react';
import { render, screen } from '@testing-library/react';
import { DecisionBreakdown } from './DecisionBreakdown';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('DecisionBreakdown', () => {
  it('renders empty state if no factors are available', () => {
    renderWithTheme(<DecisionBreakdown bestGateId="gate-1" />);
    expect(screen.getByText('No technical factors available.')).toBeInTheDocument();
  });

  it('renders technical factors correctly', () => {
    const explainabilityMatrix = {
      'gate-1': {
        crowdImpact: 'Severe',
        distanceImpact: 'Moderate',
        incidentProximity: 'Low',
      }
    };
    renderWithTheme(<DecisionBreakdown bestGateId="gate-1" explainabilityMatrix={explainabilityMatrix} />);
    
    expect(screen.getByText('Crowd Density Impact')).toBeInTheDocument();
    expect(screen.getByText('Severe')).toBeInTheDocument();
    
    expect(screen.getByText('Distance Impact')).toBeInTheDocument();
    expect(screen.getByText('Moderate')).toBeInTheDocument();
    
    expect(screen.getByText('Incident Proximity')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });
});
