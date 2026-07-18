import { Box, Typography, Paper, Stack, useTheme, Fade } from '@mui/material';
import { FiCpu, FiMessageSquare } from 'react-icons/fi';

export function ExplanationCard({ explanation }) {
  const theme = useTheme();

  if (!explanation) return null;

  return (
    <Fade in={true} timeout={1000}>
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} mb={3}>
          <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.50', color: 'primary.main' }}>
            <FiCpu size={24} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Gemini AI Analysis
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Generated in real-time from deterministic models
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 3, mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <FiMessageSquare color={theme.palette.primary.main} />
            Summary
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontStyle: 'italic', lineHeight: 1.6 }}
          >
            "{explanation.summary}"
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>
            Detailed Reasoning
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {explanation.explanation}
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
}
