import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/gemini.service.js', () => ({
  callGeminiAPI: jest.fn()
}));
jest.unstable_mockModule('../../utils/promptBuilder.js', () => ({
  buildSystemPrompt: jest.fn(),
  buildUserPrompt: jest.fn()
}));
jest.unstable_mockModule('../../utils/fallbackExplanation.js', () => ({
  getFallbackExplanation: jest.fn()
}));
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { generateExplanation } = await import('../../services/explanation.service.js');
const { callGeminiAPI } = await import('../../services/gemini.service.js');
const { getFallbackExplanation } = await import('../../utils/fallbackExplanation.js');

describe('Explanation Service', () => {
  it('should return error explanation if recommendation data has error', async () => {
    const result = await generateExplanation({ error: 'ALL_GATES_CLOSED' });
    expect(result.riskLevel).toBe('HIGH');
    expect(result.summary).toContain('No safe gates');
  });

  it('should return explanation from Gemini API on success', async () => {
    callGeminiAPI.mockResolvedValueOnce({ expl: 'test explanation' });
    const result = await generateExplanation({ foo: 'bar' });
    expect(result.expl).toBe('test explanation');
  });

  it('should fallback on Gemini API error', async () => {
    callGeminiAPI.mockRejectedValueOnce(new Error('API failure'));
    getFallbackExplanation.mockReturnValueOnce({ fallback: true });
    
    const result = await generateExplanation({ foo: 'bar' });
    expect(result.fallback).toBe(true);
  });
});
