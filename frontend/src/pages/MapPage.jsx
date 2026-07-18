import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Drawer, useMediaQuery, useTheme, IconButton, Alert } from '@mui/material';
import {
  getGates,
  getCrowdDensity,
  getIncidents,
  getWeather,
  getMapConfig,
} from '../services/mapService.js';
import { StadiumMap } from '../components/map/StadiumMap.jsx';
import { SidePanel } from '../components/map/SidePanel.jsx';
import { PageContainer } from '../components/layout/PageContainer.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';
import { FiMenu } from 'react-icons/fi';

export default function MapPage() {
  usePageTitle('Interactive Stadium Map');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapData, setMapData] = useState({ gates: [], crowd: [], incidents: [], weather: null });
  const [mapConfig, setMapConfig] = useState(null);

  const [filters, setFilters] = useState({
    openGates: true,
    closedGates: true,
    crowdAreas: true,
    incidents: true,
  });

  const [activeLayers, setActiveLayers] = useState({
    gates: true,
    crowd: true,
    incidents: true,
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gates, crowd, incidents, weather, config] = await Promise.all([
          getGates(),
          getCrowdDensity(),
          getIncidents(),
          getWeather(),
          getMapConfig(),
        ]);

        setMapData({ gates, crowd, incidents, weather });
        setMapConfig(config);
      } catch (err) {
        setError('Failed to load map data. Please check your connection or try again later.');
        console.error('Error fetching map data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const drawerContent = useMemo(
    () => (
      <Box
        sx={{
          width: { xs: 280, md: 320 },
          height: '100%',
          borderRight: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        <SidePanel data={mapData} loading={loading} filters={filters} setFilters={setFilters} />
      </Box>
    ),
    [theme.palette.divider, mapData, loading, filters],
  );

  return (
    <PageContainer disableContainer>
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Desktop Side Panel */}
        {!isMobile && drawerContent}

        {/* Mobile Side Panel (Drawer) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 280,
                top: 64,
                height: 'calc(100% - 64px)',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Map Container */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 1000,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              <FiMenu />
            </IconButton>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                position: 'absolute',
                top: 16,
                left: { xs: 60, md: 16 },
                right: 16,
                zIndex: 1000,
              }}
            >
              {error}
            </Alert>
          )}

          {!error && mapConfig && (
            <StadiumMap
              data={mapData}
              config={mapConfig}
              filters={filters}
              activeLayers={activeLayers}
              setActiveLayers={setActiveLayers}
            />
          )}
        </Box>
      </Box>
    </PageContainer>
  );
}
