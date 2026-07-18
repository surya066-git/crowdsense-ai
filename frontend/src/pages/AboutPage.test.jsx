import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/common/AppCard.jsx', () => ({
  AppCard: ({ children }) => <div data-testid="app-card">{children}</div>
}));

describe('AboutPage', () => {
  it('renders correctly', () => {
    render(<MemoryRouter><AboutPage /></MemoryRouter>);
    expect(screen.getByText('About CrowdSense AI')).toBeInTheDocument();
    expect(screen.getByText('Frontend Stack')).toBeInTheDocument();
  });
});
