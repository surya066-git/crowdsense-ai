import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { FiArrowRight, FiPlayCircle } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/appConstants.js';

export function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          sx={{ alignItems: 'center', textAlign: 'center', zIndex: 1, position: 'relative' }}
        >
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              maxWidth: 900,
            }}
          >
            Smart Stadium Experience Powered by AI
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mb: 2, fontWeight: 400 }}
          >
            CrowdSense AI helps fans navigate crowded stadiums with real-time intelligence, ensuring
            safe entry, optimized routes, and zero waiting time.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.RECOMMENDATION}
              variant="contained"
              size="large"
              endIcon={<FiArrowRight />}
              sx={{ px: 4, py: 1.5, borderRadius: '50px', fontWeight: 600 }}
            >
              Start Demo
            </Button>
            <Button
              component={RouterLink}
              to={ROUTE_PATHS.ABOUT}
              variant="outlined"
              size="large"
              startIcon={<FiPlayCircle />}
              sx={{ px: 4, py: 1.5, borderRadius: '50px', fontWeight: 600 }}
            >
              Learn More
            </Button>
          </Stack>

          {/* AI Illustration Placeholder */}
          <Box
            sx={{
              mt: 8,
              width: '100%',
              maxWidth: 1000,
              height: { xs: 200, sm: 300, md: 400 },
              borderRadius: 4,
              background: `linear-gradient(45deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: theme.shadows[10],
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography variant="h5" color="grey.500" sx={{ fontWeight: 500 }}>
              [ AI Dashboard Illustration Placeholder ]
            </Typography>
            {/* Decorative glow */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                height: '60%',
                background: theme.palette.primary.main,
                filter: 'blur(100px)',
                opacity: 0.15,
                zIndex: 0,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
