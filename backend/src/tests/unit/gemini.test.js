import { generateExplanation } from '../../services/explanation.service.js';
import * as geminiConfig from '../../config/gemini.config.js';

// Gemini config will naturally be unconfigured in the test environment
// since GEMINI_API_KEY is typically omitted or mocked via env vars.

describe('Gemini Explanation Service (Fallback Mode)', () => {
  const mockRecommendation = {
    bestGate: { gateId: 'gate_a', gateName: 'North Gate', walkingTimeMins: 5, waitingTimeMins: 2 },
    alternativeGate: {
      gateId: 'gate_b',
      gateName: 'East Gate',
      walkingTimeMins: 10,
      waitingTimeMins: 5,
    },
    safetyScore: 90,
    confidenceScore: 95,
    explainabilityMatrix: {
      gate_a: { crowdImpact: 'Low', incidentProximity: 'None' },
    },
  };

  test('Gracefully degrades to fallback explanation when Gemini is unconfigured', async () => {
    const explanation = await generateExplanation(mockRecommendation);

    expect(explanation).toHaveProperty('summary');
    expect(explanation).toHaveProperty('explanation');
    expect(explanation).toHaveProperty('alternative');
    expect(explanation).toHaveProperty('safetyTips');
    expect(explanation).toHaveProperty('riskLevel');

    expect(explanation.summary).toContain('North Gate');
    expect(explanation.explanation).toContain('low');
    expect(explanation.riskLevel).toBe('LOW');
  });

  test('Handles ALL_GATES_CLOSED_OR_UNSAFE gracefully', async () => {
    const explanation = await generateExplanation({ error: 'ALL_GATES_CLOSED_OR_UNSAFE' });
    expect(explanation.riskLevel).toBe('HIGH');
    expect(explanation.summary).toContain('No safe gates');
  });
});
