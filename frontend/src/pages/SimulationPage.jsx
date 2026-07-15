import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Stack, Snackbar, Alert } from '@mui/material';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

import { ControlPanel } from '../components/simulation/ControlPanel.jsx';
import { LiveFeed } from '../components/simulation/LiveFeed.jsx';
import { SimulationCharts } from '../components/simulation/SimulationCharts.jsx';
import { HeroCard } from '../components/recommendation/HeroCard.jsx';
import { LoadingState } from '../components/recommendation/StateViews.jsx';

import { triggerSimulationEvent, resetSimulation } from '../services/simulationService.js';
import { getRecommendation } from '../services/recommendationService.js';

export default function SimulationPage() {
  usePageTitle('Real-Time Admin Simulation');

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [chartHistory, setChartHistory] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  // Baseline load
  useEffect(() => {
    fetchLatestRecommendation('Baseline initialized');
  }, []);

  const fetchLatestRecommendation = async (reason) => {
    setLoading(true);
    try {
      const payload = { fanLocation: { lat: 37.7760, lng: -122.4175 }, destinationSection: "Sec 101", stadiumId: "sim_1" };
      const rec = await getRecommendation(payload);
      setRecommendation(rec);
      setChartHistory(prev => [...prev, { score: rec.safetyScore }].slice(-10)); // Keep last 10
      logEvent(reason, 'SUCCESS');
    } catch (err) {
      logEvent('Failed to fetch recommendation: All gates might be unsafe.', 'ERROR');
      setRecommendation(null);
    }
    setLoading(false);
  };

  const logEvent = (message, type = 'INFO') => {
    setEvents(prev => [{ time: new Date().toLocaleTimeString(), message, type }, ...prev].slice(0, 15));
  };

  const handleTriggerEvent = async (type, action, target) => {
    try {
      await triggerSimulationEvent(type, action, target);
      setNotification({ open: true, message: `Simulated ${action} successfully.`, severity: 'success' });
      // Core Feature: Immediately re-run AI Recommendation Engine without page refresh
      await fetchLatestRecommendation(`Triggered ${action} at ${target || 'Stadium'}`);
    } catch (err) {
      setNotification({ open: true, message: `Simulation failed: ${err.message}`, severity: 'error' });
    }
  };

  const handleReset = async () => {
    await resetSimulation();
    setEvents([]);
    setChartHistory([]);
    setNotification({ open: true, message: `Stadium reset to baseline.`, severity: 'info' });
    await fetchLatestRecommendation('Stadium Reset');
  };

  return (
    <PageContainer>
      <Box sx={{ bgcolor: 'background.default', py: { xs: 4, md: 8 }, minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <Typography variant="h4" component="h1" fontWeight={800} gutterBottom>
            Real-Time Decision Support
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={4}>
            Simulate stadium events and watch the AI Decision Engine instantly recalculate routing.
          </Typography>
          
          <Grid container spacing={3}>
            {/* Left Column: Controls & Feed */}
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <ControlPanel onTriggerEvent={handleTriggerEvent} onReset={handleReset} />
                <LiveFeed events={events} />
              </Stack>
            </Grid>

            {/* Right Column: AI Output & Charts */}
            <Grid xs={12} md={8}>
              <Stack spacing={3}>
                {loading && !recommendation ? (
                  <LoadingState />
                ) : recommendation ? (
                  <HeroCard data={recommendation} />
                ) : (
                  <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'error.50', color: 'error.main' }}>
                    <Typography variant="h6">CRITICAL: No Safe Routes Available</Typography>
                  </Paper>
                )}
                <SimulationCharts historyData={chartHistory} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={4000} 
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={notification.severity} variant="filled">{notification.message}</Alert>
      </Snackbar>
    </PageContainer>
  );
}
