import { callGeminiAPI } from './gemini.service.js';
import { buildSystemPrompt, buildUserPrompt } from '../utils/promptBuilder.js';
import { getFallbackExplanation } from '../utils/fallbackExplanation.js';
import { logger } from '../utils/logger.js';

export const generateExplanation = async (recommendationData) => {
  // If the engine failed to find a gate, we don't need an AI explanation.
  if (recommendationData.error) {
    return {
      summary: 'No safe gates available.',
      explanation: 'All gates are currently closed or marked unsafe due to incidents.',
      alternative: null,
      safetyTips: ['Await stadium announcements.', 'Do not approach closed gates.'],
      riskLevel: 'HIGH',
    };
  }

  try {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(recommendationData);

    const explanationJson = await callGeminiAPI(systemPrompt, userPrompt);
    return explanationJson;
  } catch (error) {
    logger.warn(`Explanation Service degrading to fallback. Reason: ${error.message}`);
    // Deterministic fallback guarantees the API never fails for the end-user
    return getFallbackExplanation(recommendationData);
  }
};
