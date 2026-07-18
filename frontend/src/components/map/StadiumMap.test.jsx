import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { StadiumMap } from './StadiumMap';

// Mock react-leaflet and its components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  Polygon: ({ children }) => <div data-testid="polygon">{children}</div>,
  useMap: () => ({
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    locate: vi.fn(),
    fitBounds: vi.fn(),
    getContainer: vi.fn(() => ({ requestFullscreen: vi.fn() }))
  })
}));

// Mock Leaflet - must include default export for L.divIcon etc.
vi.mock('leaflet', () => {
  const L = {
    divIcon: vi.fn(() => ({})),
    icon: vi.fn(() => ({})),
    marker: vi.fn(() => ({ addTo: vi.fn() })),
  };
  return { default: L, ...L };
});

// Mock subcomponents
vi.mock('./MapToolbar.jsx', () => ({
  MapToolbar: () => <div data-testid="map-toolbar" />
}));
vi.mock('./MapLegend.jsx', () => ({
  MapLegend: () => <div data-testid="map-legend" />
}));

describe('StadiumMap', () => {
  const mockConfig = {
    center: [0, 0],
    zoom: 13,
    bounds: [[-1, -1], [1, 1]]
  };

  const mockData = {
    crowd: [
      { id: '1', level: 'LOW', bounds: [[0, 0], [1, 1]] }
    ],
    gates: [
      { id: '1', lat: 0, lng: 0, status: 'OPEN', name: 'Gate 1', currentCrowd: 10, capacity: 100, queueLength: 5 },
      { id: '2', lat: 1, lng: 1, status: 'CLOSED', name: 'Gate 2' }
    ],
    incidents: [
      { id: '1', lat: 0, lng: 0, type: 'Medical', severity: 'HIGH', timestamp: '2023-01-01T00:00:00Z' }
    ]
  };

  const defaultFilters = {
    openGates: true,
    closedGates: true,
    crowdAreas: true,
    incidents: true
  };

  const activeLayers = {
    gates: true,
    crowd: true,
    incidents: true
  };

  const renderWithTheme = (component) => {
    return render(<ThemeProvider theme={createTheme()}>{component}</ThemeProvider>);
  };

  it('returns null if no config', () => {
    const { container } = renderWithTheme(<StadiumMap config={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders map with all layers', () => {
    renderWithTheme(
      <StadiumMap 
        data={mockData} 
        config={mockConfig} 
        filters={defaultFilters} 
        activeLayers={activeLayers}
        setActiveLayers={vi.fn()}
      />
    );

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    expect(screen.getByTestId('map-toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('map-legend')).toBeInTheDocument();
    
    // 1 polygon for crowd
    expect(screen.getAllByTestId('polygon')).toHaveLength(1);
    
    // 2 markers for gates + 1 for incident = 3
    expect(screen.getAllByTestId('marker')).toHaveLength(3);
  });
});
