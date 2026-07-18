import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/feedback/NotFoundState.jsx', () => ({
  NotFoundState: () => <div data-testid="not-found-state">Not Found</div>
}));

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(screen.getByTestId('not-found-state')).toBeInTheDocument();
  });
});
