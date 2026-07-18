import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecommendationPage from './RecommendationPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../services/recommendationService.js', () => ({
  getRecommendation: vi.fn().mockResolvedValue({
    explanation: 'test explanation',
    bestGate: { gateId: 'gate1' },
    explainabilityMatrix: {},
    alternativeGate: null,
    timestamp: new Date().toISOString(),
    recommendationId: 'rec123'
  })
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/recommendation/StateViews.jsx', () => ({
  EmptyState: ({ onGenerate }) => <div data-testid="empty-state"><button onClick={onGenerate}>Generate</button></div>,
  LoadingState: () => <div data-testid="loading-state">Loading</div>,
  ErrorState: () => <div data-testid="error-state">Error</div>
}));

describe('RecommendationPage', () => {
  it('renders empty state initially', () => {
    render(<MemoryRouter><RecommendationPage /></MemoryRouter>);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
