import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase.js';

// Mock Firebase dependencies
vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('../config/firebase.js', () => ({
  auth: {},
  isFirebaseConfigured: true,
}));

const TestComponent = () => {
  const { user, loading, loginWithGoogle, logout, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>
      {user && <div data-testid="user-email">{user.email}</div>}
      <button data-testid="login-btn" onClick={loginWithGoogle}>Login</button>
      <button data-testid="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

const CustomTestHookComponent = () => {
  useAuth();
  return <div />;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AuthProvider', () => {
    it('shows loading state initially if firebase is configured', () => {
      onAuthStateChanged.mockImplementation(() => vi.fn());
      render(
        <AuthProvider>
          <div data-testid="child">Child</div>
        </AuthProvider>
      );
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });

    it('renders children when auth state is resolved', () => {
      onAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return vi.fn();
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });

    it('updates user state when onAuthStateChanged fires', () => {
      onAuthStateChanged.mockImplementation((auth, callback) => {
        callback({ email: 'test@example.com' });
        return vi.fn();
      });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com');
    });

    it('calls signInWithPopup when loginWithGoogle is triggered', async () => {
      onAuthStateChanged.mockImplementation((auth, callback) => {
        callback(null);
        return vi.fn();
      });
      signInWithPopup.mockResolvedValue({ user: { email: 'test@example.com' } });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('login-btn'));
      
      expect(GoogleAuthProvider).toHaveBeenCalled();
      expect(signInWithPopup).toHaveBeenCalledWith(auth, expect.any(Object));
    });

    it('calls signOut when logout is triggered', async () => {
      onAuthStateChanged.mockImplementation((auth, callback) => {
        callback({ email: 'test@example.com' });
        return vi.fn();
      });
      signOut.mockResolvedValue();

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );

      fireEvent.click(screen.getByTestId('logout-btn'));
      
      expect(signOut).toHaveBeenCalledWith(auth);
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthProvider', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<CustomTestHookComponent />)).toThrow('useAuth must be used within an AuthProvider');
      consoleError.mockRestore();
    });
  });
});
