import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MapPage from './MapPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../services/mapService.js', () => ({
  getGates: vi.fn().mockResolvedValue([]),
  getCrowdDensity: vi.fn().mockResolvedValue([]),
  getIncidents: vi.fn().mockResolvedValue([]),
  getWeather: vi.fn().mockResolvedValue(null),
  getMapConfig: vi.fn().mockResolvedValue({})
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/map/StadiumMap.jsx', () => ({
  StadiumMap: () => <div data-testid="stadium-map" />
}));

vi.mock('../components/map/SidePanel.jsx', () => ({
  SidePanel: () => <div data-testid="side-panel" />
}));

describe('MapPage', () => {
  it('renders correctly', async () => {
    render(<MemoryRouter><MapPage /></MemoryRouter>);
    expect(await screen.findByTestId('stadium-map')).toBeInTheDocument();
  });
});
