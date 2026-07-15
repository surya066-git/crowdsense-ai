import { getGeminiModel, isGeminiConfigured } from '../config/gemini.config.js';
import { logger } from '../utils/logger.js';

export const callGeminiAPI = async (systemInstruction, promptText) => {
  if (!isGeminiConfigured) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const model = getGeminiModel();
  if (!model) {
    throw new Error('Gemini model initialization failed');
  }

  try {
    // Generate content using the new SDK format
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemInstruction}\n\n${promptText}` }] }
      ]
    });
    
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    logger.error(`Gemini API Error: ${error.message}`);
    throw error;
  }
};
