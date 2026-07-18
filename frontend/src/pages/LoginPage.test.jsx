import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

vi.mock('../hooks/usePageTitle.js', () => ({
  usePageTitle: vi.fn()
}));

vi.mock('../contexts/AuthContext.jsx', () => ({
  useAuth: vi.fn()
}));

vi.mock('../hooks/useSnackbar.js', () => ({
  useSnackbar: () => ({ showSnackbar: vi.fn() })
}));

vi.mock('../components/layout/PageContainer.jsx', () => ({
  PageContainer: ({ children }) => <div data-testid="page-container">{children}</div>
}));

import { useAuth } from '../contexts/AuthContext.jsx';

describe('LoginPage', () => {
  it('renders login button if not authenticated', () => {
    useAuth.mockReturnValue({ loginWithGoogle: vi.fn(), isAuthenticated: false });
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('calls loginWithGoogle on click', () => {
    const loginWithGoogle = vi.fn();
    useAuth.mockReturnValue({ loginWithGoogle, isAuthenticated: false });
    render(<MemoryRouter><LoginPage /></MemoryRouter>);
    fireEvent.click(screen.getByText('Sign in with Google'));
    expect(loginWithGoogle).toHaveBeenCalled();
  });
});
