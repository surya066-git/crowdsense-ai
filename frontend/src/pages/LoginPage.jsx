import { Typography } from '@mui/material';
import { FiLogIn } from 'react-icons/fi';
import { AppCard } from '../components/common/AppCard.jsx';
import { SecondaryButton } from '../components/common/SecondaryButton.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function LoginPage() {
  usePageTitle('Login');

  return (
    <PageContainer className="auth-page">
      <AppCard className="auth-card">
        <div className="auth-icon">
          <FiLogIn aria-hidden="true" />
        </div>
        <Typography variant="h3" component="h1">
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Authentication will be connected in the Firebase phase.
        </Typography>
        <SecondaryButton disabled>Continue</SecondaryButton>
      </AppCard>
    </PageContainer>
  );
}
