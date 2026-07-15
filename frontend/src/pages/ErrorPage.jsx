import { useRouteError } from 'react-router-dom';
import { ServerErrorState } from '../components/feedback/ServerErrorState.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function ErrorPage() {
  const error = useRouteError();
  usePageTitle('Error');

  return (
    <PageContainer>
      <ServerErrorState onRetry={() => window.location.assign('/')} />
      {import.meta.env.DEV && error ? (
        <pre className="debug-error">{error.statusText || error.message}</pre>
      ) : null}
    </PageContainer>
  );
}
