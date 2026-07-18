import React from 'react';
import { render, screen } from '@testing-library/react';
import { LiveFeed } from './LiveFeed';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const renderWithTheme = (component) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('LiveFeed', () => {
  it('renders waiting message when no events', () => {
    renderWithTheme(<LiveFeed events={[]} />);
    expect(screen.getByText('Waiting for simulation events...')).toBeInTheDocument();
  });

  it('renders events', () => {
    const events = [
      { type: 'ERROR', message: 'Test Error', time: '10:00' },
      { type: 'INFO', message: 'Test Info', time: '10:01' }
    ];
    renderWithTheme(<LiveFeed events={events} />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('Test Info')).toBeInTheDocument();
    expect(screen.getByText('10:01')).toBeInTheDocument();
  });
});
