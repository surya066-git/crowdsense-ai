import { AppBar, Toolbar, Box, Button } from '@mui/material';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { FiLogIn, FiArrowRight, FiGithub } from 'react-icons/fi';
import { ROUTE_PATHS } from '../../constants/appConstants.js';
import { BrandLogo } from './BrandLogo.jsx';
import { SecondaryButton } from '../common/SecondaryButton.jsx';
import { PrimaryButton } from '../common/PrimaryButton.jsx';

export function Navbar() {
  return (
    <AppBar className="app-navbar" position="sticky" color="inherit" elevation={1} sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
      <Toolbar className="app-navbar-toolbar" sx={{ justifyContent: 'space-between' }}>
        <BrandLogo />
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }} aria-label="Primary navigation">
          <NavLink className="nav-link" to={ROUTE_PATHS.HOME} end style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>Home</NavLink>
          <a href="#features" className="nav-link" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>Features</a>
          <a href="#how-it-works" className="nav-link" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>How It Works</a>
          <NavLink className="nav-link" to={ROUTE_PATHS.ABOUT} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>About</NavLink>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <FiGithub /> GitHub
          </a>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <SecondaryButton
            className="navbar-login-button"
            component={RouterLink}
            to={ROUTE_PATHS.LOGIN}
            startIcon={<FiLogIn />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Login
          </SecondaryButton>
          <PrimaryButton
            component={RouterLink}
            to={ROUTE_PATHS.RECOMMENDATION}
            endIcon={<FiArrowRight />}
          >
            Start Demo
          </PrimaryButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
