import { Box, Container, Grid, Typography, Card, CardContent, useTheme } from '@mui/material';
import { FiUsers, FiClock, FiMap, FiAlertTriangle } from 'react-icons/fi';

const problems = [
  {
    title: 'Crowded Gates',
    desc: 'Fans often face overwhelming crowds at popular entrances.',
    icon: FiUsers,
  },
  {
    title: 'Long Waiting',
    desc: 'Waiting times can exceed 45 minutes during peak hours.',
    icon: FiClock,
  },
  {
    title: 'Wrong Route',
    desc: 'Confusing navigation leads to getting lost in the stadium.',
    icon: FiMap,
  },
  {
    title: 'Safety Issues',
    desc: 'High density increases the risk of stampedes and incidents.',
    icon: FiAlertTriangle,
  },
];

export function ProblemSection() {
  const theme = useTheme();
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center' }}
          fontWeight={700}
          gutterBottom
        >
          The Problem
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }} mb={8}>
          Why attending a live match can sometimes feel like a hassle.
        </Typography>

        <Grid container spacing={4}>
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Grid xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'error.light',
                        color: 'error.dark',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <Icon size={28} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
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
