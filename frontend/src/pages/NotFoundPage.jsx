import { NotFoundState } from '../components/feedback/NotFoundState.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Page not found');

  return (
    <PageContainer>
      <NotFoundState />
    </PageContainer>
  );
}
