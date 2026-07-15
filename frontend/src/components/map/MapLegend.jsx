import { Box, Typography, Stack, useTheme } from '@mui/material';

const LEGEND_ITEMS = [
  { label: 'Low Crowd', color: '#4caf50' },
  { label: 'Medium Crowd', color: '#ffeb3b' },
  { label: 'High Crowd', color: '#ff9800' },
  { label: 'Very High Crowd', color: '#f44336' },
  { label: 'Open Gate', color: '#2196f3', isMarker: true },
  { label: 'Closed Gate', color: '#9e9e9e', isMarker: true },
  { label: 'Incident', color: '#e91e63', isMarker: true },
];

export function MapLegend() {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        position: 'absolute', 
        bottom: 24, 
        left: 24, 
        zIndex: 1000, 
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        minWidth: 150
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Legend
      </Typography>
      <Stack spacing={1}>
        {LEGEND_ITEMS.map((item, index) => (
          <Stack key={index} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {item.isMarker ? (
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: item.color, border: '2px solid white', boxShadow: 1 }} />
            ) : (
              <Box sx={{ width: 16, height: 16, bgcolor: item.color, opacity: 0.7, border: `1px solid ${item.color}` }} />
            )}
            <Typography variant="caption">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
