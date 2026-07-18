import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/appConstants.js';

export function CtaSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 4,
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            boxShadow: theme.shadows[10],
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background circle */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '-10%',
              width: '120%',
              height: '200%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
              zIndex: 0,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" component="h2" fontWeight={800} gutterBottom>
              Ready to Upgrade Your Stadium Experience?
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 6, maxWidth: 600, mx: 'auto' }}>
              Join thousands of fans using CrowdSense AI to navigate stadiums safely and
              efficiently. Start your interactive demo now.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ justifyContent: 'center' }}
            >
              <Button
                component={RouterLink}
                to={ROUTE_PATHS.RECOMMENDATION}
                variant="contained"
                size="large"
                endIcon={<FiArrowRight />}
                sx={{
                  bgcolor: 'common.white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 700,
                }}
              >
                Start Demo
              </Button>
              <Button
                component={RouterLink}
                to={ROUTE_PATHS.ABOUT}
                variant="outlined"
                size="large"
                startIcon={<FiInfo />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'common.white',
                  '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.1)' },
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600,
                }}
              >
                Learn More
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
