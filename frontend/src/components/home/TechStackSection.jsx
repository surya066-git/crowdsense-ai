import { Box, Container, Stack, Typography, Chip, useTheme } from '@mui/material';

const techStack = ['React', 'Node.js', 'Firebase', 'Google Gemini AI', 'Leaflet', 'Material UI'];

export function TechStackSection() {
  const theme = useTheme();
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.900', color: 'common.white' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Powered by Modern Technology
        </Typography>
        <Typography variant="subtitle1" color="grey.400" mb={6}>
          Built for scale, speed, and real-time intelligence.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {techStack.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem',
                py: 2,
                px: 1,
                border: `1px solid rgba(255, 255, 255, 0.2)`,
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
