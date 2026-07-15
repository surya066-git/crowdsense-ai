import { getDistance, evaluateIncidents, generateDecision } from '../../src/engine/decisionEngine.js';

describe('Decision Engine Unit Tests', () => {
  const fanLocation = { lat: 37.7750, lng: -122.4190 };
  const mockStadiumData = {
    gates: [
      { id: 'gate_a', name: 'Gate A', lat: 37.7749, lng: -122.4194, status: 'OPEN', capacity: 5000, currentCrowd: 1000, queueLength: 10 },
      { id: 'gate_b', name: 'Gate B', lat: 37.7740, lng: -122.4180, status: 'OPEN', capacity: 3000, currentCrowd: 2800, queueLength: 45 } // Highly crowded
    ],
    incidents: [],
    weather: { rain: '0%', wind: '10' }
  };

  test('Calculates Haversine distance correctly', () => {
    const d = getDistance(37.7749, -122.4194, 37.7740, -122.4180);
    expect(d).toBeGreaterThan(0);
  });

  test('Evaluates incidents near gate', () => {
    const gate = mockStadiumData.gates[0];
    const incidents = [{ lat: 37.7749, lng: -122.4195, severity: 'HIGH' }];
    const res = evaluateIncidents(gate, incidents);
    expect(res.severity).toBe('HIGH');
    expect(res.penalty).toBe(100);
  });

  test('Generates deterministic decision avoiding crowded gate', () => {
    const result = generateDecision(fanLocation, 'Sec 101', mockStadiumData);
    expect(result.bestGate.gateId).toBe('gate_a'); // Gate B is too crowded
    expect(result.safetyScore).toBeGreaterThan(50);
  });

  test('Handles all gates closed fallback', () => {
    const closedData = { ...mockStadiumData, gates: [{ status: 'CLOSED' }, { status: 'CLOSED' }] };
    const result = generateDecision(fanLocation, 'Sec 101', closedData);
    expect(result.error).toBe('ALL_GATES_CLOSED_OR_UNSAFE');
  });
});
