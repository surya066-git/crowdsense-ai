import { useState } from 'react';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { UploadCard } from '../components/upload/UploadCard.jsx';
import { UploadHistory } from '../components/upload/UploadHistory.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function UploadPage() {
  usePageTitle('Upload Data');
  const theme = useTheme();

  // Used to trigger a refresh of the history component when a new file is uploaded
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <PageContainer>
      <Box sx={{ bgcolor: 'grey.50', py: 8, minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Box mb={6}>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              Upload Synthetic Data
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Import simulated stadium data to train the decision engine or prepare a demo scenario.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid xs={12} md={7}>
              <UploadCard onUploadSuccess={handleUploadSuccess} />
            </Grid>
            <Grid xs={12} md={5}>
              <UploadHistory refreshTrigger={refreshTrigger} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PageContainer>
  );
}
