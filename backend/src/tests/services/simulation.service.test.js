import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/map.service.js', () => ({
  updateSimulationState: jest.fn(),
  addIncident: jest.fn(),
  resetSimulationState: jest.fn(),
  getGatesData: jest.fn().mockResolvedValue([
    { id: 'gate_a', status: 'OPEN', currentCrowd: 1000, capacity: 5000, queueLength: 10, lat: 0, lng: 0 }
  ]),
  getWeatherData: jest.fn().mockResolvedValue({ rain: '0%', wind: '0 mph' }),
}));
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { processSimulationEvent } = await import('../../services/simulation.service.js');
const { resetSimulationState, updateSimulationState, addIncident } = await import('../../services/map.service.js');

describe('Simulation Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reset simulation', async () => {
    const res = await processSimulationEvent({ type: 'RESET' });
    expect(resetSimulationState).toHaveBeenCalled();
    expect(res.message).toContain('reset');
  });

  it('should process GATE CLOSE event', async () => {
    await processSimulationEvent({ type: 'GATE', action: 'CLOSE', target: 'gate_a' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should process GATE OPEN event', async () => {
    await processSimulationEvent({ type: 'GATE', action: 'OPEN', target: 'gate_a' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should process CROWD INCREASE event', async () => {
    await processSimulationEvent({ type: 'CROWD', action: 'INCREASE' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should process CROWD DECREASE event', async () => {
    await processSimulationEvent({ type: 'CROWD', action: 'DECREASE' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should process INCIDENT event', async () => {
    await processSimulationEvent({ type: 'INCIDENT', action: 'MEDICAL', target: 'gate_a' });
    expect(addIncident).toHaveBeenCalled();
  });

  it('should process INCIDENT FIRE event', async () => {
    await processSimulationEvent({ type: 'INCIDENT', action: 'FIRE', target: 'gate_a' });
    expect(addIncident).toHaveBeenCalled();
  });

  it('should process WEATHER STORM event', async () => {
    await processSimulationEvent({ type: 'WEATHER', action: 'STORM' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should process WEATHER RAIN event', async () => {
    await processSimulationEvent({ type: 'WEATHER', action: 'RAIN' });
    expect(updateSimulationState).toHaveBeenCalled();
  });

  it('should throw on unknown event type', async () => {
    await expect(processSimulationEvent({ type: 'UNKNOWN', action: 'DO' })).rejects.toThrow('Unknown simulation event type');
  });
});
