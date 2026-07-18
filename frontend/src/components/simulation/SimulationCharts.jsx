import { Box, Typography, Paper, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function SimulationCharts({ historyData }) {
  const theme = useTheme();

  // Mocked data structure parsing history
  const data = {
    labels: historyData.map((_, i) => `T-${historyData.length - i}`),
    datasets: [
      {
        label: 'Primary Gate Score Penalty',
        data: historyData.map((h) => h.score),
        borderColor: theme.palette.error.main,
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, suggestedMax: 100 },
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
        minHeight: 300,
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        AI Recommendation Trend
      </Typography>
      <Box sx={{ height: 250, width: '100%' }}>
        <Line options={options} data={data} />
      </Box>
    </Paper>
  );
}
