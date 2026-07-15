import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { FiZoomIn, FiZoomOut, FiCrosshair, FiMaximize, FiMap, FiUsers, FiAlertTriangle } from 'react-icons/fi';
import { useMap } from 'react-leaflet';

export function MapToolbar({ onToggleLayer, activeLayers }) {
  const theme = useTheme();
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 17 });
  };
  
  const toggleFullscreen = () => {
    const container = map.getContainer();
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const buttonStyle = {
    bgcolor: 'background.paper',
    boxShadow: theme.shadows[2],
    '&:hover': { bgcolor: 'grey.100' },
    borderRadius: 1,
    p: 1
  };

  return (
    <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Tooltip title="Zoom In" placement="left">
        <IconButton sx={buttonStyle} onClick={handleZoomIn}>
          <FiZoomIn size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="left">
        <IconButton sx={buttonStyle} onClick={handleZoomOut}>
          <FiZoomOut size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Locate Me" placement="left">
        <IconButton sx={buttonStyle} onClick={handleLocate}>
          <FiCrosshair size={18} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Toggle Fullscreen" placement="left">
        <IconButton sx={buttonStyle} onClick={toggleFullscreen}>
          <FiMaximize size={18} />
        </IconButton>
      </Tooltip>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="Toggle Gates" placement="left">
          <IconButton 
            sx={{ ...buttonStyle, bgcolor: activeLayers.gates ? 'primary.main' : 'background.paper', color: activeLayers.gates ? 'white' : 'inherit', '&:hover': { bgcolor: activeLayers.gates ? 'primary.dark' : 'grey.100' } }} 
            onClick={() => onToggleLayer('gates')}
          >
            <FiMap size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Crowd Density" placement="left">
          <IconButton 
            sx={{ ...buttonStyle, bgcolor: activeLayers.crowd ? 'secondary.main' : 'background.paper', color: activeLayers.crowd ? 'white' : 'inherit', '&:hover': { bgcolor: activeLayers.crowd ? 'secondary.dark' : 'grey.100' } }} 
            onClick={() => onToggleLayer('crowd')}
          >
            <FiUsers size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Incidents" placement="left">
          <IconButton 
            sx={{ ...buttonStyle, bgcolor: activeLayers.incidents ? 'error.main' : 'background.paper', color: activeLayers.incidents ? 'white' : 'inherit', '&:hover': { bgcolor: activeLayers.incidents ? 'error.dark' : 'grey.100' } }} 
            onClick={() => onToggleLayer('incidents')}
          >
            <FiAlertTriangle size={18} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
