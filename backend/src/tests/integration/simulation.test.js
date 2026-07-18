import { processSimulationEvent } from '../../services/simulation.service.js';
import { getGatesData, getWeatherData } from '../../services/map.service.js';

describe('Simulation Service Integration Tests', () => {
  beforeEach(async () => {
    // Reset state before each test
    await processSimulationEvent({ type: 'RESET' });
  });

  test('GATE CLOSE event mutates stadium state properly', async () => {
    // 1. Fire close event
    await processSimulationEvent({ type: 'GATE', action: 'CLOSE', target: 'gate_a' });

    // 2. Read new state
    const gates = await getGatesData();
    const gateA = gates.find((g) => g.id === 'gate_a');

    expect(gateA.status).toBe('CLOSED');
    expect(gateA.currentCrowd).toBe(0);
  });

  test('CROWD INCREASE event scales queues', async () => {
    const initialGates = await getGatesData();
    const initialCrowd = initialGates[0].currentCrowd;
    const initialQueue = initialGates[0].queueLength;

    await processSimulationEvent({ type: 'CROWD', action: 'INCREASE' });

    const newGates = await getGatesData();
    expect(newGates[0].currentCrowd).toBeGreaterThan(initialCrowd);
    expect(newGates[0].queueLength).toBeGreaterThan(initialQueue);
  });

  test('WEATHER STORM event triggers severe warning', async () => {
    await processSimulationEvent({ type: 'WEATHER', action: 'STORM' });
    const weather = await getWeatherData();

    expect(weather.warning).toBe('SEVERE STORM');
    expect(weather.rain).toBe('100%');
  });
});
