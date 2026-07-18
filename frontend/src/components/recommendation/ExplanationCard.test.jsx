import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExplanationCard } from './ExplanationCard';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('ExplanationCard', () => {
  it('returns null when explanation is not provided', () => {
    const { container } = renderWithTheme(<ExplanationCard />);
    expect(container.firstChild).toBeNull();
  });

  it('renders explanation details correctly', () => {
    const explanation = {
      summary: 'Short summary',
      explanation: 'Detailed reasoning text'
    };
    
    renderWithTheme(<ExplanationCard explanation={explanation} />);
    expect(screen.getByText('Gemini AI Analysis')).toBeInTheDocument();
    expect(screen.getByText(/"Short summary"/i)).toBeInTheDocument();
    expect(screen.getByText('Detailed reasoning text')).toBeInTheDocument();
  });
});
