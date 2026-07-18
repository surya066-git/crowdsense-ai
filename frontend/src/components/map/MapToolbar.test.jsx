import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { MapToolbar } from './MapToolbar';
import { useMap } from 'react-leaflet';

// Mock react-leaflet
vi.mock('react-leaflet', () => ({
  useMap: vi.fn(),
}));

describe('MapToolbar', () => {
  const mockMap = {
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    locate: vi.fn(),
    getContainer: vi.fn(() => ({
      requestFullscreen: vi.fn(() => Promise.resolve()),
    })),
  };

  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useMap.mockReturnValue(mockMap);
  });

  it('renders all buttons', () => {
    const onToggleLayer = vi.fn();
    renderWithTheme(<MapToolbar onToggleLayer={onToggleLayer} activeLayers={{ gates: true, crowd: false, incidents: true }} />);
    
    // Zoom In
    expect(screen.getByLabelText(/Zoom In/i)).toBeInTheDocument();
    // Zoom Out
    expect(screen.getByLabelText(/Zoom Out/i)).toBeInTheDocument();
  });

  it('calls map functions on click', () => {
    const onToggleLayer = vi.fn();
    renderWithTheme(<MapToolbar onToggleLayer={onToggleLayer} activeLayers={{}} />);
    
    fireEvent.click(screen.getByLabelText(/Zoom In/i));
    expect(mockMap.zoomIn).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText(/Zoom Out/i));
    expect(mockMap.zoomOut).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText(/Locate Me/i));
    expect(mockMap.locate).toHaveBeenCalledWith({ setView: true, maxZoom: 17 });
  });

  it('calls onToggleLayer on layer button click', () => {
    const onToggleLayer = vi.fn();
    renderWithTheme(<MapToolbar onToggleLayer={onToggleLayer} activeLayers={{}} />);
    
    fireEvent.click(screen.getByLabelText(/Toggle Gates/i));
    expect(onToggleLayer).toHaveBeenCalledWith('gates');

    fireEvent.click(screen.getByLabelText(/Toggle Crowd Density/i));
    expect(onToggleLayer).toHaveBeenCalledWith('crowd');

    fireEvent.click(screen.getByLabelText(/Toggle Incidents/i));
    expect(onToggleLayer).toHaveBeenCalledWith('incidents');
  });
});
