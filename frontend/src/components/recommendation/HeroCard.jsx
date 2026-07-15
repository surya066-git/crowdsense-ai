import { Box, Typography, Paper, Stack, useTheme, Fade, CircularProgress, Chip } from '@mui/material';
import { FiCheckCircle, FiClock, FiActivity } from 'react-icons/fi';

export function HeroCard({ data }) {
  const theme = useTheme();
  const { bestGate, safetyScore, confidenceScore } = data;

  const getScoreColor = (score) => {
    if (score >= 80) return theme.palette.success.main;
    if (score >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'primary.900', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background element */}
        <Box sx={{ position: 'absolute', top: -100, right: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'primary.800', opacity: 0.5, zIndex: 0 }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between',  alignItems: 'flex-start' }} mb={4}>
            <Box>
              <Chip label="Optimal Route Found" color="success" size="small" icon={<FiCheckCircle />} sx={{ mb: 2, fontWeight: 600, bgcolor: 'rgba(76, 175, 80, 0.2)', color: '#81c784' }} />
              <Typography variant="h3" fontWeight={800} gutterBottom>
                {bestGate.gateName}
              </Typography>
              <Typography variant="h6" color="primary.200" fontWeight={400}>
                Recommended Entry Point
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                  <CircularProgress variant="determinate" value={100} size={70} thickness={4} sx={{ color: 'rgba(255,255,255,0.1)' }} />
                  <CircularProgress variant="determinate" value={safetyScore} size={70} thickness={4} sx={{ color: getScoreColor(safetyScore), position: 'absolute', left: 0 }} />
                  <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" component="div" fontWeight={700}>{Math.round(safetyScore)}</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" display="block" color="primary.200">Safety Score</Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                  <CircularProgress variant="determinate" value={100} size={70} thickness={4} sx={{ color: 'rgba(255,255,255,0.1)' }} />
                  <CircularProgress variant="determinate" value={confidenceScore} size={70} thickness={4} sx={{ color: getScoreColor(confidenceScore), position: 'absolute', left: 0 }} />
                  <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body1" component="div" fontWeight={700}>{Math.round(confidenceScore)}</Typography>
                  </Box>
                </Box>
                <Typography variant="caption" display="block" color="primary.200">AI Confidence</Typography>
              </Box>
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', flex: 1, backdropFilter: 'blur(10px)' }}>
              <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <FiClock size={24} />
                </Box>
                <Box>
                  <Typography variant="caption" color="primary.200">Estimated Walking Time</Typography>
                  <Typography variant="h6" fontWeight={700}>{bestGate.walkingTimeMins} mins</Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.1)', flex: 1, backdropFilter: 'blur(10px)' }}>
              <Stack direction="row" sx={{ alignItems: 'center' }} spacing={2}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
                  <FiActivity size={24} />
                </Box>
                <Box>
                  <Typography variant="caption" color="primary.200">Expected Queue Wait</Typography>
                  <Typography variant="h6" fontWeight={700}>{bestGate.waitingTimeMins} mins</Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Paper>
    </Fade>
  );
}
