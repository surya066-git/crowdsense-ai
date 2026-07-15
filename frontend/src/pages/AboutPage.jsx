import { Typography } from '@mui/material';
import { AppCard } from '../components/common/AppCard.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

const stackItems = ['React 19', 'Vite', 'Material UI', 'React Router', 'Axios', 'Firebase later'];

export default function AboutPage() {
  usePageTitle('About');

  return (
    <PageContainer>
      <section className="page-header">
        <Typography variant="h2" component="h1">
          About CrowdSense AI
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A fan-facing smart stadium entry experience for PromptWars Virtual Challenge 4.
        </Typography>
      </section>

      <section className="page-grid two-column-grid">
        <AppCard>
          <Typography variant="h5" component="h2">
            Product Focus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CrowdSense AI helps fans move toward safer and faster stadium entry points.
          </Typography>
        </AppCard>
        <AppCard>
          <Typography variant="h5" component="h2">
            Frontend Stack
          </Typography>
          <div className="tag-list">
            {stackItems.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </AppCard>
      </section>
    </PageContainer>
  );
}
