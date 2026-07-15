import { Typography } from '@mui/material';
import { EmptyState } from '../components/feedback/EmptyState.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function HistoryPage() {
  usePageTitle('History');

  return (
    <PageContainer>
      <section className="page-header">
        <Typography variant="h2" component="h1">
          Recommendation History
        </Typography>
      </section>
      <EmptyState
        title="No recommendations yet"
        message="History will appear after the recommendation workflow is connected."
      />
    </PageContainer>
  );
}
