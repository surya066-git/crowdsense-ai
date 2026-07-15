import { useState, useMemo } from 'react';
import { Box, Typography, Divider, FormGroup, FormControlLabel, Checkbox, Stack, Chip, CircularProgress } from '@mui/material';
import { FiCloudRain, FiWind, FiSun, FiEye } from 'react-icons/fi';

export function SidePanel({ data, loading, filters, setFilters }) {
  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const { gates, incidents, weather } = data;
  
  const openGates = gates.filter(g => g.status === 'OPEN').length;
  const closedGates = gates.filter(g => g.status === 'CLOSED').length;
  
  const totalCrowd = gates.reduce((acc, g) => acc + g.currentCrowd, 0);
  const avgCrowd = gates.length ? Math.round(totalCrowd / gates.length) : 0;

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Stadium Overview
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Real-time insights from uploaded datasets.
        </Typography>

        <Stack spacing={2} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Total Gates</Typography>
            <Typography variant="body2" fontWeight={600}>{gates.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Open Gates</Typography>
            <Typography variant="body2" fontWeight={600} color="success.main">{openGates}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Closed Gates</Typography>
            <Typography variant="body2" fontWeight={600} color="text.secondary">{closedGates}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Avg Crowd Density</Typography>
            <Typography variant="body2" fontWeight={600} color="warning.main">{avgCrowd} people/gate</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Active Incidents</Typography>
            <Typography variant="body2" fontWeight={600} color={incidents.length > 0 ? 'error.main' : 'success.main'}>
              {incidents.length}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {weather && (
        <>
          <Box sx={{ p: 3 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>Weather Conditions</Typography>
            <Stack direction="row" sx={{ flexWrap: 'wrap' }} gap={1}>
              <Chip icon={<FiSun />} label={`${weather.temperature}°F`} size="small" />
              <Chip icon={<FiCloudRain />} label={`Rain: ${weather.rain}`} size="small" />
              <Chip icon={<FiWind />} label={weather.wind} size="small" />
              <Chip icon={<FiEye />} label={weather.visibility} size="small" />
            </Stack>
          </Box>
          <Divider />
        </>
      )}

      <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>Data Filters</Typography>
        <FormGroup>
          <FormControlLabel 
            control={<Checkbox checked={filters.openGates} onChange={handleFilterChange} name="openGates" size="small" />} 
            label={<Typography variant="body2">Show Open Gates</Typography>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={filters.closedGates} onChange={handleFilterChange} name="closedGates" size="small" />} 
            label={<Typography variant="body2">Show Closed Gates</Typography>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={filters.crowdAreas} onChange={handleFilterChange} name="crowdAreas" size="small" />} 
            label={<Typography variant="body2">Show Crowded Areas</Typography>} 
          />
          <FormControlLabel 
            control={<Checkbox checked={filters.incidents} onChange={handleFilterChange} name="incidents" size="small" />} 
            label={<Typography variant="body2">Show Incidents</Typography>} 
          />
        </FormGroup>
      </Box>
    </Box>
  );
}
