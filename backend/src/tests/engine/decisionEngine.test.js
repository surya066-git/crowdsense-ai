import { getDistance, evaluateIncidents, generateDecision } from '../../engine/decisionEngine.js';

describe('Decision Engine', () => {
  describe('getDistance', () => {
    it('should calculate distance correctly', () => {
      // 0,0 to 0,0 is 0
      expect(getDistance(0, 0, 0, 0)).toBe(0);
      
      // Known distance approximation
      const d = getDistance(37.7749, -122.4194, 37.774, -122.418);
      expect(d).toBeGreaterThan(0);
    });

    it('should use cache', () => {
      const d1 = getDistance(10, 10, 20, 20);
      const d2 = getDistance(10, 10, 20, 20); // should hit cache
      expect(d1).toBe(d2);
    });
  });

  describe('evaluateIncidents', () => {
    it('should evaluate CRITICAL severity', () => {
      const gate = { lat: 10, lng: 10 };
      const incidents = [{ lat: 10, lng: 10, severity: 'CRITICAL' }];
      const res = evaluateIncidents(gate, incidents);
      expect(res.penalty).toBe(1000);
      expect(res.severity).toBe('CRITICAL');
    });

    it('should evaluate HIGH severity', () => {
      const gate = { lat: 10, lng: 10 };
      const incidents = [{ lat: 10, lng: 10, severity: 'HIGH' }];
      const res = evaluateIncidents(gate, incidents);
      expect(res.penalty).toBe(100);
      expect(res.severity).toBe('HIGH');
    });
    
    it('should evaluate MEDIUM severity', () => {
      const gate = { lat: 10, lng: 10 };
      const incidents = [{ lat: 10, lng: 10, severity: 'MEDIUM' }];
      const res = evaluateIncidents(gate, incidents);
      expect(res.penalty).toBe(50);
      expect(res.severity).toBe('MEDIUM');
    });

    it('should evaluate LOW severity', () => {
      const gate = { lat: 10, lng: 10 };
      const incidents = [{ lat: 10, lng: 10, severity: 'LOW' }];
      const res = evaluateIncidents(gate, incidents);
      expect(res.penalty).toBe(20);
      expect(res.severity).toBe('LOW');
    });
    
    it('should ignore incidents far away', () => {
      const gate = { lat: 10, lng: 10 };
      // very far away
      const incidents = [{ lat: 11, lng: 11, severity: 'CRITICAL' }];
      const res = evaluateIncidents(gate, incidents);
      expect(res.penalty).toBe(0);
      expect(res.severity).toBe('None');
    });
  });

  describe('generateDecision', () => {
    const fan = { lat: 10, lng: 10 };
    const dest = 'Section A';
    
    it('should return error if no valid gates', () => {
      const stadium = { gates: [], incidents: [], weather: null };
      const res = generateDecision(fan, dest, stadium);
      expect(res.error).toBe('ALL_GATES_CLOSED_OR_UNSAFE');
    });

    it('should return error if all gates are closed or full', () => {
      const stadium = {
        gates: [
          { id: 'g1', status: 'CLOSED' },
          { id: 'g2', status: 'OPEN', currentCrowd: 100, capacity: 100 }
        ],
        incidents: [], weather: null
      };
      const res = generateDecision(fan, dest, stadium);
      expect(res.error).toBe('ALL_GATES_CLOSED_OR_UNSAFE');
    });
    
    it('should return error if gates have CRITICAL incidents', () => {
      const stadium = {
        gates: [
          { id: 'g1', status: 'OPEN', currentCrowd: 0, capacity: 100, lat: 10, lng: 10 }
        ],
        incidents: [{ lat: 10, lng: 10, severity: 'CRITICAL' }], weather: null
      };
      const res = generateDecision(fan, dest, stadium);
      expect(res.error).toBe('ALL_GATES_CLOSED_OR_UNSAFE');
    });

    it('should recommend best gate and fallback', () => {
      const stadium = {
        gates: [
          { id: 'g1', name: 'G1', status: 'OPEN', currentCrowd: 10, capacity: 100, queueLength: 5, lat: 10, lng: 10 },
          { id: 'g2', name: 'G2', status: 'OPEN', currentCrowd: 10, capacity: 100, queueLength: 5, lat: 10.01, lng: 10.01 }, // further away
        ],
        incidents: [],
        weather: { rain: '0%', wind: '10' }
      };
      const res = generateDecision(fan, dest, stadium);
      expect(res.recommendationId).toBeDefined();
      expect(res.bestGate.gateId).toBe('g1');
      expect(res.alternativeGate.gateId).toBe('g2');
    });
    
    it('should penalize crowded gates correctly', () => {
      const stadium = {
        gates: [
          { id: 'g1', name: 'G1', status: 'OPEN', currentCrowd: 85, capacity: 100, queueLength: 5, lat: 10, lng: 10 },
          { id: 'g2', name: 'G2', status: 'OPEN', currentCrowd: 10, capacity: 100, queueLength: 5, lat: 10.001, lng: 10.001 }, // slightly further
        ],
        incidents: [],
        weather: { rain: '100%', wind: '30' } // bad weather
      };
      const res = generateDecision(fan, dest, stadium);
      // g2 should be best because g1 is heavily penalized for crowd (>80)
      expect(res.bestGate.gateId).toBe('g2');
    });

    it('should not provide alternative if no other gate exists', () => {
      const stadium = {
        gates: [
          { id: 'g1', name: 'G1', status: 'OPEN', currentCrowd: 10, capacity: 100, queueLength: 5, lat: 10, lng: 10 }
        ],
        incidents: [],
        weather: null
      };
      const res = generateDecision(fan, dest, stadium);
      expect(res.alternativeGate).toBeNull();
    });
  });
});
