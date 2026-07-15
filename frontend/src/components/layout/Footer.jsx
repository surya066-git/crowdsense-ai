import { Box, Container, Grid, Typography, Stack, Divider, IconButton } from '@mui/material';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/appConstants.js';
import { BrandLogo } from './BrandLogo.jsx';

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', py: { xs: 6, md: 8 }, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          <Grid xs={12} md={4}>
            <Box sx={{ mb: 2, filter: 'brightness(0) invert(1)' }}>
              <BrandLogo />
            </Box>
            <Typography variant="body2" sx={{ mb: 2, maxWidth: 300 }}>
              Smart Stadium Decision Support System for fans. Avoid crowds, stay safe, and enjoy the game.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit" component="a" href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FiGithub size={20} />
              </IconButton>
              <IconButton color="inherit" component="a" href="#" target="_blank" rel="noopener noreferrer">
                <FiTwitter size={20} />
              </IconButton>
              <IconButton color="inherit" component="a" href="#" target="_blank" rel="noopener noreferrer">
                <FiLinkedin size={20} />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid xs={6} md={2}>
            <Typography variant="subtitle1" color="common.white" fontWeight={700} gutterBottom>
              Product
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" component={RouterLink} to={ROUTE_PATHS.RECOMMENDATION} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Demo</Typography>
              <Typography variant="body2" component="a" href="#features" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Features</Typography>
              <Typography variant="body2" component="a" href="#how-it-works" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>How it Works</Typography>
            </Stack>
          </Grid>

          <Grid xs={6} md={2}>
            <Typography variant="subtitle1" color="common.white" fontWeight={700} gutterBottom>
              Company
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" component={RouterLink} to={ROUTE_PATHS.ABOUT} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>About</Typography>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Contact</Typography>
              <Typography variant="body2" component="a" href="#" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Privacy Policy</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'grey.800', my: 4 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between',  alignItems: 'center' }} spacing={2}>
          <Typography variant="body2">
            © {new Date().getFullYear()} CrowdSense AI. All rights reserved.
          </Typography>
          <Typography variant="body2" color="primary.light" fontWeight={600}>
            Hack2Skill PromptWars Virtual Challenge 4
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
