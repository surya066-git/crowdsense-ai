import { getFallbackExplanation } from '../../utils/fallbackExplanation.js';

describe('fallbackExplanation', () => {
  it('should generate explanation correctly for high safety score and no incidents', () => {
    const data = {
      bestGate: { gateId: 'g1', gateName: 'Gate 1', walkingTimeMins: 5, waitingTimeMins: 2 },
      alternativeGate: { gateName: 'Gate 2' },
      safetyScore: 90,
      explainabilityMatrix: {
        g1: { crowdImpact: 'LOW', incidentProximity: 'None' }
      }
    };
    const result = getFallbackExplanation(data);
    expect(result.riskLevel).toBe('LOW');
    expect(result.explanation).toContain('We recommend Gate 1');
    expect(result.explanation).toContain('crowd density at this gate is currently low');
    expect(result.explanation).toContain('no major incidents');
    expect(result.alternative).toContain('best alternative is Gate 2');
    expect(result.summary).toContain('5-minute walk');
  });

  it('should generate explanation correctly for high risk and incidents', () => {
    const data = {
      bestGate: { gateId: 'g1', gateName: 'Gate 1', walkingTimeMins: 5, waitingTimeMins: 2 },
      alternativeGate: null,
      safetyScore: 50,
      explainabilityMatrix: {
        g1: { incidentProximity: 'High' }
      }
    };
    const result = getFallbackExplanation(data);
    expect(result.riskLevel).toBe('HIGH');
    expect(result.alternative).toBe('No viable alternative gates are currently available.');
    expect(result.explanation).toContain('high severity incident nearby');
  });

  it('should generate explanation correctly for medium risk', () => {
    const data = {
      bestGate: { gateId: 'g1', gateName: 'Gate 1', walkingTimeMins: 5, waitingTimeMins: 2 },
      safetyScore: 75,
      explainabilityMatrix: {}
    };
    const result = getFallbackExplanation(data);
    expect(result.riskLevel).toBe('MEDIUM');
  });
});
