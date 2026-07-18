import { jest } from '@jest/globals';

jest.unstable_mockModule('../../engine/decisionEngine.js', () => ({
  generateDecision: jest.fn()
}));
jest.unstable_mockModule('../../repositories/recommendation.repository.js', () => ({
  saveRecommendationHistory: jest.fn()
}));
jest.unstable_mockModule('../../services/map.service.js', () => ({
  getGatesData: jest.fn().mockResolvedValue([]),
  getCrowdDensityZones: jest.fn().mockResolvedValue([]),
  getIncidentsData: jest.fn().mockResolvedValue([]),
  getWeatherData: jest.fn().mockResolvedValue({}),
}));
jest.unstable_mockModule('../../services/explanation.service.js', () => ({
  generateExplanation: jest.fn()
}));

const { processRecommendation } = await import('../../services/recommendation.service.js');
const { generateDecision } = await import('../../engine/decisionEngine.js');
const { generateExplanation } = await import('../../services/explanation.service.js');
const { saveRecommendationHistory } = await import('../../repositories/recommendation.repository.js');

describe('Recommendation Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process recommendation successfully', async () => {
    generateDecision.mockReturnValue({ bestGate: 'g1' });
    generateExplanation.mockResolvedValue({ expl: 'test explanation' });

    const result = await processRecommendation({ lat: 0, lng: 0 }, 'dest', 'stadium1', 'user1');
    expect(result.bestGate).toBe('g1');
    expect(result.explanation.expl).toBe('test explanation');
    expect(saveRecommendationHistory).toHaveBeenCalled();
  });

  it('should throw if decision engine returns error', async () => {
    generateDecision.mockReturnValue({ error: 'ALL_GATES_CLOSED' });
    await expect(processRecommendation({ lat: 0, lng: 0 }, 'dest', 's1', 'u1')).rejects.toThrow('ALL_GATES_CLOSED');
  });
});
