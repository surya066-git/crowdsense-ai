import { Box, Container, Grid, Typography, Card, CardContent, useTheme } from '@mui/material';
import { FiCheckSquare, FiNavigation, FiActivity, FiAlertOctagon, FiGitBranch, FiShield } from 'react-icons/fi';

const features = [
  { title: 'AI Recommendation', desc: 'Personalized gate suggestions based on real-time crowd data.', icon: FiCheckSquare },
  { title: 'Smart Navigation', desc: 'Interactive maps guiding you smoothly to your designated seat.', icon: FiNavigation },
  { title: 'Crowd Analysis', desc: 'Predictive density mapping to avoid congested stadium zones.', icon: FiActivity },
  { title: 'Live Incidents', desc: 'Real-time alerts for bottlenecks or safety hazards.', icon: FiAlertOctagon },
  { title: 'Alternative Route', desc: 'Dynamic rerouting if your primary path becomes crowded.', icon: FiGitBranch },
  { title: 'Safety Score', desc: 'Instant safety assessments for every gate and concourse.', icon: FiShield },
];

export function FeaturesSection() {
  const theme = useTheme();
  return (
    <Box id="features" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" sx={{ textAlign: 'center' }} fontWeight={700} gutterBottom>
          Powerful Features
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }} mb={8}>
          Everything you need for a seamless game day.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid xs={12} sm={6} md={4} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: 3, 
                    border: `1px solid ${theme.palette.divider}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[4]
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ 
                      width: 50, height: 50, borderRadius: 2, 
                      bgcolor: 'primary.main', color: 'primary.contrastText', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      mb: 3 
                    }}>
                      <Icon size={24} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
