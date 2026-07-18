import { jest } from '@jest/globals';

jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { 
  getGatesData, 
  getCrowdDensityZones, 
  getIncidentsData, 
  getWeatherData, 
  getMapConfigData,
  updateSimulationState,
  addIncident,
  resetSimulationState
} = await import('../../services/map.service.js');

describe('Map Service', () => {
  beforeEach(() => {
    resetSimulationState();
  });

  it('should return initial data correctly', async () => {
    const gates = await getGatesData();
    expect(gates.length).toBeGreaterThan(0);
    
    const config = await getMapConfigData();
    expect(config.center).toBeDefined();
  });

  it('should update simulation state', async () => {
    updateSimulationState({ weather: { rain: '50%' } });
    const weather = await getWeatherData();
    expect(weather.rain).toBe('50%');
  });

  it('should add incident correctly', async () => {
    const initialIncidents = await getIncidentsData();
    const count = initialIncidents.length;
    addIncident({ type: 'Test', severity: 'LOW' });
    const newIncidents = await getIncidentsData();
    expect(newIncidents.length).toBe(count + 1);
    expect(newIncidents[newIncidents.length - 1].type).toBe('Test');
  });
});
