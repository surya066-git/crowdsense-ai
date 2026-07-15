import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';

const steps = [
  { step: '1', title: 'Enter Destination', desc: 'Tell the app your ticket details, including block and seat number.' },
  { step: '2', title: 'Upload Stadium Data', desc: 'The system fetches live stadium congestion and incident reports.' },
  { step: '3', title: 'AI Analysis', desc: 'Gemini AI processes the data to find the optimal path for you.' },
  { step: '4', title: 'Get Recommendation', desc: 'Receive your personalized gate assignment and safe walking route.' },
];

export function HowItWorksSection() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" sx={{ textAlign: 'center' }} fontWeight={700} gutterBottom>
          How It Works
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }} mb={8}>
          Four simple steps to a better stadium experience.
        </Typography>

        <Grid container spacing={4}>
          {steps.map((item, index) => (
            <Grid xs={12} sm={6} md={3} key={index}>
              <Card elevation={0} sx={{ height: '100%', bgcolor: 'grey.50', borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h2" fontWeight={800} color="primary.light" gutterBottom>
                    {item.step}
                  </Typography>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
