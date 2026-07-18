import { useState, useCallback, useMemo } from 'react';
import { Box, Container, Grid, Typography, useTheme, Stack } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { getRecommendation } from '../services/recommendationService.js';

// Components
import { EmptyState, LoadingState, ErrorState } from '../components/recommendation/StateViews.jsx';
import { HeroCard } from '../components/recommendation/HeroCard.jsx';
import { ExplanationCard } from '../components/recommendation/ExplanationCard.jsx';
import { AlternativeCard } from '../components/recommendation/AlternativeCard.jsx';
import { DecisionBreakdown } from '../components/recommendation/DecisionBreakdown.jsx';
import { SafetyCard } from '../components/recommendation/SafetyCard.jsx';

export default function RecommendationPage() {
  usePageTitle('AI Recommendation Dashboard');
  const theme = useTheme();

  const [status, setStatus] = useState('EMPTY'); // EMPTY, LOADING, SUCCESS, ERROR
  const [errorMsg, setErrorMsg] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const fetchRecommendation = useCallback(async () => {
    setStatus('LOADING');
    try {
      // Mocking the user's location and destination for the Hackathon demo
      const payload = {
        fanLocation: { lat: 37.776, lng: -122.4175 },
        destinationSection: 'Section 101',
        stadiumId: 'stadium_sf_01',
      };

      const data = await getRecommendation(payload);
      setRecommendation(data);
      setStatus('SUCCESS');
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || err.message || 'Failed to generate recommendation.',
      );
      setStatus('ERROR');
    }
  }, []);

  const content = useMemo(() => {
    if (status === 'EMPTY') return <EmptyState onGenerate={fetchRecommendation} />;
    if (status === 'LOADING') return <LoadingState />;
    if (status === 'ERROR') return <ErrorState message={errorMsg} onRetry={fetchRecommendation} />;

    if (status === 'SUCCESS' && recommendation) {
      return (
        <Grid container spacing={3}>
          {/* Main Column */}
          <Grid xs={12} md={8}>
            <Stack spacing={3}>
              <HeroCard data={recommendation} />
              <ExplanationCard explanation={recommendation.explanation} />

              <Grid container spacing={3}>
                <Grid xs={12} sm={6}>
                  <DecisionBreakdown
                    explainabilityMatrix={recommendation.explainabilityMatrix}
                    bestGateId={recommendation.bestGate.gateId}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <SafetyCard explanation={recommendation.explanation} />
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          {/* Side Column */}
          <Grid xs={12} md={4}>
            <Stack spacing={3}>
              <AlternativeCard
                alternativeGate={recommendation.alternativeGate}
                explanation={recommendation.explanation}
              />
              {/* Additional Mini Stats could go here */}
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: 'grey.50',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                  Journey Timeline
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generated: {new Date(recommendation.timestamp).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recommendation ID: <br />
                  <span style={{ fontSize: '0.75rem' }}>{recommendation.recommendationId}</span>
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      );
    }

    return null;
  }, [status, errorMsg, recommendation, fetchRecommendation, theme.palette.divider]);

  return (
    <PageContainer>
      <Box sx={{ bgcolor: 'background.default', py: { xs: 4, md: 8 }, minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <Box mb={4} display="flex" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
                Intelligent Routing
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                AI-driven analysis of real-time stadium telemetry.
              </Typography>
            </Box>
          </Box>

          {content}
        </Container>
      </Box>
    </PageContainer>
  );
}
