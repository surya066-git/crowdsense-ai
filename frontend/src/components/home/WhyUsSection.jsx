import { Box, Container, Grid, Typography, Stack, useTheme } from '@mui/material';
import { FiClock, FiUsers, FiShield, FiCpu, FiCheck } from 'react-icons/fi';

const benefits = [
  { title: 'Save Time', desc: 'No more waiting in massive queues at the wrong gate.', icon: FiClock },
  { title: 'Avoid Crowds', desc: 'Real-time density tracking keeps you away from bottlenecks.', icon: FiUsers },
  { title: 'Safe Entry', desc: 'Prioritize safety with intelligent routing during emergencies.', icon: FiShield },
  { title: 'AI Powered', desc: 'State-of-the-art predictive models personalize your experience.', icon: FiCpu },
];

export function WhyUsSection() {
  const theme = useTheme();

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ alignItems: 'center' }}>
          <Grid xs={12} md={5}>
            <Typography variant="h3" component="h2" fontWeight={700} gutterBottom>
              Why CrowdSense AI?
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={4}>
              We are redefining the stadium experience by putting intelligent decision-support directly into the hands of fans. 
            </Typography>
            <Stack spacing={3}>
              {benefits.map((item, index) => (
                <Stack key={index} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                  <Box sx={{ mt: 0.5, color: 'primary.main' }}>
                    <FiCheck size={20} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid xs={12} md={7}>
            <Box 
              sx={{ 
                width: '100%', 
                height: 400, 
                borderRadius: 4, 
                bgcolor: 'grey.100', 
                backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              {/* Decorative graphic representing intelligence */}
              <Box sx={{ position: 'relative', width: 200, height: 200 }}>
                <Box sx={{ position: 'absolute', inset: 0, border: `4px solid ${theme.palette.primary.main}`, borderRadius: '50%', opacity: 0.2 }} />
                <Box sx={{ position: 'absolute', inset: 20, border: `4px dashed ${theme.palette.secondary.main}`, borderRadius: '50%', animation: 'spin 10s linear infinite', '@keyframes spin': { '100%': { transform: 'rotate(360deg)' } } }} />
                <Box sx={{ position: 'absolute', inset: 40, border: `4px solid ${theme.palette.primary.main}`, borderRadius: '50%', opacity: 0.5 }} />
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiCpu size={48} color={theme.palette.primary.main} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
