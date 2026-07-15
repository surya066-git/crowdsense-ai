import React from 'react';
import { Box, Container, Stack, Typography, useTheme } from '@mui/material';
import { FiArrowRight, FiDatabase, FiCpu, FiCheckCircle, FiShield } from 'react-icons/fi';

const steps = [
  { title: 'Input', icon: FiDatabase, desc: 'Stadium & Fan Data' },
  { title: 'AI Analysis', icon: FiCpu, desc: 'Gemini Engine' },
  { title: 'Recommendation', icon: FiCheckCircle, desc: 'Best Gates & Routes' },
  { title: 'Safe Entry', icon: FiShield, desc: 'Optimized Experience' },
];

export function SolutionSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" sx={{ textAlign: 'center' }} fontWeight={700} gutterBottom>
          The Solution
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center' }} mb={8}>
          How CrowdSense AI transforms the experience.
        </Typography>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between',  alignItems: 'center' }} 
          spacing={{ xs: 4, md: 2 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <React.Fragment key={index}>
                <Box sx={{ textAlign: 'center', width: { xs: '100%', md: '20%' } }}>
                  <Box sx={{ 
                      width: 80, height: 80, borderRadius: 4, 
                      bgcolor: 'primary.light', color: 'primary.dark', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      mx: 'auto', mb: 2,
                      boxShadow: theme.shadows[2]
                    }}>
                    <Icon size={36} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.desc}
                  </Typography>
                </Box>
                {!isLast && (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.disabled', transform: { xs: 'rotate(90deg)', md: 'none' } }}>
                    <FiArrowRight size={32} />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}
