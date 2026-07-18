import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoadingState, ErrorState, EmptyState } from './StateViews';
import { ThemeProvider, createTheme } from '@mui/material';

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
};

describe('StateViews', () => {
  describe('LoadingState', () => {
    it('renders loading text', () => {
      renderWithTheme(<LoadingState />);
      expect(screen.getByText(/AI Decision Engine is calculating/i)).toBeInTheDocument();
    });
  });

  describe('ErrorState', () => {
    it('renders default error message', () => {
      renderWithTheme(<ErrorState />);
      expect(screen.getByText(/Recommendation Failed/i)).toBeInTheDocument();
      expect(screen.getByText(/encountered an error or all gates are currently marked unsafe/i)).toBeInTheDocument();
    });

    it('renders custom error message', () => {
      renderWithTheme(<ErrorState message="Custom error" />);
      expect(screen.getByText('Custom error')).toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
      const handleRetry = vi.fn();
      renderWithTheme(<ErrorState onRetry={handleRetry} />);
      fireEvent.click(screen.getByRole('button', { name: /Retry Request/i }));
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('EmptyState', () => {
    it('renders ready text', () => {
      renderWithTheme(<EmptyState />);
      expect(screen.getByText(/Ready for Routing/i)).toBeInTheDocument();
    });

    it('calls onGenerate when generate button is clicked', () => {
      const handleGenerate = vi.fn();
      renderWithTheme(<EmptyState onGenerate={handleGenerate} />);
      fireEvent.click(screen.getByRole('button', { name: /Generate Recommendation/i }));
      expect(handleGenerate).toHaveBeenCalledTimes(1);
    });
  });
});
