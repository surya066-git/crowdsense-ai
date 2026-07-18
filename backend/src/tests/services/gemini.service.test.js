import { jest } from '@jest/globals';

jest.unstable_mockModule('../../config/gemini.config.js', () => ({
  isGeminiConfigured: true,
  getGeminiModel: jest.fn()
}));
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { callGeminiAPI } = await import('../../services/gemini.service.js');
const { getGeminiModel } = await import('../../config/gemini.config.js');

describe('Gemini Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw error if model init fails', async () => {
    getGeminiModel.mockReturnValue(null);
    await expect(callGeminiAPI('system', 'user')).rejects.toThrow('Gemini model initialization failed');
  });

  it('should return parsed json from valid API response', async () => {
    const mockModel = {
      generateContent: jest.fn().mockResolvedValue({
        response: { text: () => '{"success": true}' }
      })
    };
    getGeminiModel.mockReturnValue(mockModel);

    const result = await callGeminiAPI('sys', 'prompt');
    expect(result.success).toBe(true);
    expect(mockModel.generateContent).toHaveBeenCalled();
  });

  it('should throw error if API fails', async () => {
    const mockModel = {
      generateContent: jest.fn().mockRejectedValue(new Error('API Error'))
    };
    getGeminiModel.mockReturnValue(mockModel);

    await expect(callGeminiAPI('sys', 'prompt')).rejects.toThrow('API Error');
  });
});
