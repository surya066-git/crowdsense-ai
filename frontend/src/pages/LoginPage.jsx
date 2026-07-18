import { Typography } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppCard } from '../components/common/AppCard.jsx';
import { SecondaryButton } from '../components/common/SecondaryButton.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ROUTE_PATHS } from '../constants/appConstants.js';
import { useSnackbar } from '../hooks/useSnackbar.js';

export default function LoginPage() {
  usePageTitle('Login');
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useSnackbar();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // If already authenticated, redirect them away from the login page
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || ROUTE_PATHS.HOME;
    return <Navigate to={from} replace />;
  }

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      const from = location.state?.from?.pathname || ROUTE_PATHS.HOME;
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed', error);
      showSnackbar(`Login failed: ${error.message}`, 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <PageContainer className="auth-page">
      <AppCard className="auth-card">
        <div className="auth-icon">
          <FiLogIn aria-hidden="true" />
        </div>
        <Typography variant="h3" component="h1">
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to access your saved recommendations and history.
        </Typography>
        <SecondaryButton onClick={handleLogin} disabled={isLoggingIn}>
          {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
        </SecondaryButton>
      </AppCard>
    </PageContainer>
  );
}
