import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SimulationPage from './SimulationPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../services/simulationService.js', () => ({
  triggerSimulationEvent: vi.fn().mockResolvedValue({}),
  resetSimulation: vi.fn().mockResolvedValue({})
}));

vi.mock('../services/recommendationService.js', () => ({
  getRecommendation: vi.fn().mockResolvedValue({ safetyScore: 90 })
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/simulation/ControlPanel.jsx', () => ({
  ControlPanel: () => <div data-testid="control-panel" />
}));

vi.mock('../components/simulation/LiveFeed.jsx', () => ({
  LiveFeed: () => <div data-testid="live-feed" />
}));

describe('SimulationPage', () => {
  it('renders correctly', async () => {
    render(<MemoryRouter><SimulationPage /></MemoryRouter>);
    expect(screen.getByText('Real-Time Decision Support')).toBeInTheDocument();
  });
});
