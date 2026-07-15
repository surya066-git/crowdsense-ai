import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroCard } from '../../../src/components/recommendation/HeroCard.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockTheme = createTheme();

const mockData = {
  bestGate: { gateName: 'East Gate', walkingTimeMins: 12, waitingTimeMins: 5 },
  safetyScore: 92,
  confidenceScore: 88,
};

describe('HeroCard Component', () => {
  test('Renders the best gate name correctly', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <HeroCard data={mockData} />
      </ThemeProvider>
    );

    expect(screen.getByText('East Gate')).toBeInTheDocument();
    expect(screen.getByText('Optimal Route Found')).toBeInTheDocument();
  });

  test('Displays precise walking and waiting times', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <HeroCard data={mockData} />
      </ThemeProvider>
    );

    expect(screen.getByText('12 mins')).toBeInTheDocument();
    expect(screen.getByText('5 mins')).toBeInTheDocument();
  });

  test('Renders safety and confidence scores', () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <HeroCard data={mockData} />
      </ThemeProvider>
    );

    expect(screen.getByText('92')).toBeInTheDocument();
    expect(screen.getByText('88')).toBeInTheDocument();
  });
});
