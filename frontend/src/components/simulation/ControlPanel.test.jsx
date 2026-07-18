import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from './ControlPanel';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const renderWithTheme = (component) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('ControlPanel', () => {
  it('renders correctly', () => {
    renderWithTheme(<ControlPanel onTriggerEvent={() => {}} onReset={() => {}} />);
    expect(screen.getByText('Simulation Controls')).toBeInTheDocument();
  });

  it('calls onReset when reset button is clicked', () => {
    const onReset = vi.fn();
    renderWithTheme(<ControlPanel onTriggerEvent={() => {}} onReset={onReset} />);
    fireEvent.click(screen.getByText('Reset Stadium'));
    expect(onReset).toHaveBeenCalled();
  });

  it('calls onTriggerEvent with CROWD INCREASE', () => {
    const onTriggerEvent = vi.fn();
    renderWithTheme(<ControlPanel onTriggerEvent={onTriggerEvent} onReset={() => {}} />);
    fireEvent.click(screen.getByText('Surge Crowd (+1000)'));
    expect(onTriggerEvent).toHaveBeenCalledWith('CROWD', 'INCREASE');
  });

  it('calls onTriggerEvent with GATE CLOSE', () => {
    const onTriggerEvent = vi.fn();
    renderWithTheme(<ControlPanel onTriggerEvent={onTriggerEvent} onReset={() => {}} />);
    fireEvent.click(screen.getByText('Emergency Close'));
    expect(onTriggerEvent).toHaveBeenCalledWith('GATE', 'CLOSE', 'gate_a');
  });
});
