import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HistoryPage from './HistoryPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/feedback/EmptyState.jsx', () => ({
  EmptyState: ({ title, message }) => (
    <div data-testid="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}));

describe('HistoryPage', () => {
  it('renders correctly', () => {
    render(<MemoryRouter><HistoryPage /></MemoryRouter>);
    expect(screen.getByText('Recommendation History')).toBeInTheDocument();
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
