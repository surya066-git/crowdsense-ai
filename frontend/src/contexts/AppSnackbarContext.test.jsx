import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppSnackbarProvider } from './AppSnackbarContext';
import { AppSnackbarContext } from './AppSnackbarContextValue';

// Mock the AppSnackbar component
vi.mock('../components/common/AppSnackbar.jsx', () => ({
  AppSnackbar: ({ open, message, severity, onClose }) => (
    open ? (
      <div data-testid="mock-snackbar" data-severity={severity}>
        <span>{message}</span>
        <button data-testid="close-btn" onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

const TestComponent = () => {
  const { showSnackbar, closeSnackbar } = useContext(AppSnackbarContext);
  return (
    <div>
      <button data-testid="show-info" onClick={() => showSnackbar('Info message')}>Show Info</button>
      <button data-testid="show-error" onClick={() => showSnackbar('Error message', 'error')}>Show Error</button>
      <button data-testid="close-context-btn" onClick={closeSnackbar}>Close Context</button>
    </div>
  );
};

describe('AppSnackbarProvider', () => {
  it('renders children correctly', () => {
    render(
      <AppSnackbarProvider>
        <div data-testid="child">Child Content</div>
      </AppSnackbarProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('shows snackbar with default info severity', () => {
    render(
      <AppSnackbarProvider>
        <TestComponent />
      </AppSnackbarProvider>
    );
    
    expect(screen.queryByTestId('mock-snackbar')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('show-info'));
    
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    expect(screen.getByText('Info message')).toBeInTheDocument();
    expect(screen.getByTestId('mock-snackbar')).toHaveAttribute('data-severity', 'info');
  });

  it('shows snackbar with specified severity', () => {
    render(
      <AppSnackbarProvider>
        <TestComponent />
      </AppSnackbarProvider>
    );
    
    fireEvent.click(screen.getByTestId('show-error'));
    
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByTestId('mock-snackbar')).toHaveAttribute('data-severity', 'error');
  });

  it('closes snackbar via context closeSnackbar function', () => {
    render(
      <AppSnackbarProvider>
        <TestComponent />
      </AppSnackbarProvider>
    );
    
    fireEvent.click(screen.getByTestId('show-info'));
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('close-context-btn'));
    expect(screen.queryByTestId('mock-snackbar')).not.toBeInTheDocument();
  });

  it('closes snackbar via AppSnackbar onClose prop', () => {
    render(
      <AppSnackbarProvider>
        <TestComponent />
      </AppSnackbarProvider>
    );
    
    fireEvent.click(screen.getByTestId('show-info'));
    expect(screen.getByTestId('mock-snackbar')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(screen.queryByTestId('mock-snackbar')).not.toBeInTheDocument();
  });
});
