import { jest } from '@jest/globals';

describe('gemini config', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should configure gemini if API key is present', async () => {
    const mockGetGenerativeModel = jest.fn();
    jest.unstable_mockModule('@google/generative-ai', () => ({
      GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: mockGetGenerativeModel
      }))
    }));
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { gemini: { apiKey: 'test-api-key' } }
    }));

    const { isGeminiConfigured, getGeminiModel } = await import('../../config/gemini.config.js');
    expect(isGeminiConfigured).toBe(true);
    getGeminiModel();
    expect(mockGetGenerativeModel).toHaveBeenCalledWith(expect.objectContaining({
      model: 'gemini-1.5-flash'
    }));
  });

  it('should not configure gemini if API key is missing', async () => {
    jest.unstable_mockModule('@google/generative-ai', () => ({
      GoogleGenerativeAI: jest.fn()
    }));
    jest.unstable_mockModule('../../config/env.js', () => ({
      config: { gemini: { apiKey: '' } }
    }));

    const { isGeminiConfigured, getGeminiModel } = await import('../../config/gemini.config.js');
    expect(isGeminiConfigured).toBe(false);
    expect(getGeminiModel()).toBeNull();
  });
});
