import { generateDecision } from '../engine/decisionEngine.js';
import { saveRecommendationHistory } from '../repositories/recommendation.repository.js';
import { getGatesData, getCrowdDensityZones, getIncidentsData, getWeatherData } from './map.service.js';
import { generateExplanation } from './explanation.service.js';

export const processRecommendation = async (fanLocation, destinationSection, stadiumId) => {
  // Fetch current stadium state (in a real app, this might come from a fast Redis cache)
  const [gates, crowd, incidents, weather] = await Promise.all([
    getGatesData(),
    getCrowdDensityZones(),
    getIncidentsData(),
    getWeatherData()
  ]);

  const stadiumData = { gates, crowd, incidents, weather };

  // Run deterministic engine
  const recommendation = generateDecision(fanLocation, destinationSection, stadiumData);

  if (recommendation.error) {
    throw new Error(recommendation.error);
  }

  // Generate natural language explanation using Gemini (or fallback)
  const explanation = await generateExplanation(recommendation);
  
  // Attach explanation to the recommendation payload
  const finalRecommendation = {
    ...recommendation,
    explanation
  };

  // Fire and forget storage
  saveRecommendationHistory(finalRecommendation);

  return finalRecommendation;
};
