import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { SidePanel } from './SidePanel';

describe('SidePanel', () => {
  const mockData = {
    gates: [
      { id: '1', status: 'OPEN', currentCrowd: 100 },
      { id: '2', status: 'CLOSED', currentCrowd: 0 },
      { id: '3', status: 'OPEN', currentCrowd: 200 },
    ],
    incidents: [
      { id: '1', type: 'Medical' },
      { id: '2', type: 'Security' },
      { id: '3', type: 'Fire' },
      { id: '4', type: 'Other' },
    ],
    weather: {
      temperature: 75,
      rain: '0%',
      wind: '5 mph',
      visibility: '10 miles'
    }
  };

  const defaultFilters = {
    openGates: true,
    closedGates: true,
    crowdAreas: true,
    incidents: true
  };

  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  };

  it('renders loading state', () => {
    renderWithTheme(<SidePanel loading={true} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders data correctly', () => {
    renderWithTheme(<SidePanel loading={false} data={mockData} filters={defaultFilters} setFilters={vi.fn()} />);
    
    expect(screen.getByText('Stadium Overview')).toBeInTheDocument();
    
    // Check gate stats
    expect(screen.getByText('Total Gates')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // total gates
    expect(screen.getByText('2')).toBeInTheDocument(); // open gates
    expect(screen.getByText('1')).toBeInTheDocument(); // closed gates

    // Check weather
    expect(screen.getByText('75°F')).toBeInTheDocument();
    expect(screen.getByText('Rain: 0%')).toBeInTheDocument();
  });

  it('calls setFilters on checkbox change', () => {
    const setFilters = vi.fn();
    renderWithTheme(<SidePanel loading={false} data={mockData} filters={defaultFilters} setFilters={setFilters} />);
    
    const openGatesCheckbox = screen.getByLabelText(/Show Open Gates/i);
    fireEvent.click(openGatesCheckbox);
    
    expect(setFilters).toHaveBeenCalledWith({
      ...defaultFilters,
      openGates: false
    });
  });
});
