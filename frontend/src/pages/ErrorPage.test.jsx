import { render, screen } from '@testing-library/react';
import { MemoryRouter, useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

vi.mock('../components/feedback/ServerErrorState.jsx', () => ({
  ServerErrorState: () => <div data-testid="server-error-state">Server Error State</div>
}));

describe('ErrorPage', () => {
  it('renders correctly', () => {
    useRouteError.mockReturnValue({ statusText: 'Not Found', message: 'Not Found Error' });
    render(<MemoryRouter><ErrorPage /></MemoryRouter>);
    expect(screen.getByTestId('server-error-state')).toBeInTheDocument();
  });
});
