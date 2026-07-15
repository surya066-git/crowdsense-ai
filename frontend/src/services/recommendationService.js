import { apiClient } from './apiClient.js';

/**
 * Fetches the optimal gate recommendation from the AI Decision Engine
 * @param {Object} payload - { fanLocation: { lat, lng }, destinationSection, stadiumId }
 * @returns {Promise<Object>} Recommendation JSON payload
 */
export const getRecommendation = async (payload) => {
  const response = await apiClient.post('/recommendations', payload);
  return response.data.data;
};
