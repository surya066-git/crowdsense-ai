import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { MapToolbar } from './MapToolbar.jsx';
import { MapLegend } from './MapLegend.jsx';

// Custom icons using standard Leaflet DivIcon for styling flexibility
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const ICONS = {
  openGate: createCustomIcon('#2196f3'),
  closedGate: createCustomIcon('#9e9e9e'),
  incident: createCustomIcon('#e91e63'),
};

const DENSITY_COLORS = {
  LOW: '#4caf50',
  MEDIUM: '#ffeb3b',
  HIGH: '#ff9800',
  VERY_HIGH: '#f44336'
};

export function StadiumMap({ data, config, filters, activeLayers, setActiveLayers }) {
  const [map, setMap] = useState(null);

  // When config loads or changes, fly to bounds
  useEffect(() => {
    if (map && config?.bounds) {
      map.fitBounds(config.bounds);
    }
  }, [map, config]);

  const handleToggleLayer = (layerName) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  if (!config) return null;

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer 
        center={config.center} 
        zoom={config.zoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapToolbar activeLayers={activeLayers} onToggleLayer={handleToggleLayer} />
        <MapLegend />

        {/* Crowd Density Polygons */}
        {activeLayers.crowd && filters.crowdAreas && data.crowd.map(zone => (
          <Polygon 
            key={zone.id} 
            positions={zone.bounds}
            pathOptions={{ 
              color: DENSITY_COLORS[zone.level],
              fillColor: DENSITY_COLORS[zone.level],
              fillOpacity: 0.4,
              weight: 1
            }}
          >
            <Popup>
              <Typography variant="subtitle2">Crowd Density: {zone.level}</Typography>
            </Popup>
          </Polygon>
        ))}

        {/* Gate Markers */}
        {activeLayers.gates && data.gates.map(gate => {
          if (gate.status === 'OPEN' && !filters.openGates) return null;
          if (gate.status === 'CLOSED' && !filters.closedGates) return null;

          const isClosed = gate.status === 'CLOSED';
          return (
            <Marker 
              key={gate.id} 
              position={[gate.lat, gate.lng]} 
              icon={isClosed ? ICONS.closedGate : ICONS.openGate}
            >
              <Popup>
                <Stack spacing={1} minWidth={150}>
                  <Typography variant="subtitle2" fontWeight={700}>{gate.name}</Typography>
                  <Chip size="small" label={gate.status} color={isClosed ? 'default' : 'primary'} />
                  {!isClosed && (
                    <>
                      <Typography variant="body2">Current Crowd: {gate.currentCrowd}</Typography>
                      <Typography variant="body2">Capacity: {gate.capacity}</Typography>
                      <Typography variant="body2">Queue: {gate.queueLength} mins</Typography>
                    </>
                  )}
                </Stack>
              </Popup>
            </Marker>
          );
        })}

        {/* Incident Markers */}
        {activeLayers.incidents && filters.incidents && data.incidents.map(incident => (
          <Marker 
            key={incident.id} 
            position={[incident.lat, incident.lng]} 
            icon={ICONS.incident}
          >
            <Popup>
              <Stack spacing={1} minWidth={180}>
                <Typography variant="subtitle2" fontWeight={700} color="error.main">
                  {incident.type}
                </Typography>
                <Typography variant="body2">Severity: {incident.severity}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  {new Date(incident.timestamp).toLocaleString()}
                </Typography>
              </Stack>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
