import React from 'react';
import { render, screen } from '@testing-library/react';
import { SimulationCharts } from './SimulationCharts';
import { ThemeProvider, createTheme } from '@mui/material/styles';

vi.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mock-line-chart"></div>,
}));

vi.mock('chart.js', () => ({
  Chart: {
    register: vi.fn(),
  },
  CategoryScale: vi.fn(),
  LinearScale: vi.fn(),
  PointElement: vi.fn(),
  LineElement: vi.fn(),
  Title: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn(),
}));

const renderWithTheme = (component) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SimulationCharts', () => {
  it('renders correctly', () => {
    const historyData = [{ score: 10 }, { score: 20 }];
    renderWithTheme(<SimulationCharts historyData={historyData} />);
    expect(screen.getByText('AI Recommendation Trend')).toBeInTheDocument();
    expect(screen.getByTestId('mock-line-chart')).toBeInTheDocument();
  });
});
