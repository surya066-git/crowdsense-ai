import { apiClient } from './apiClient.js';

/**
 * Triggers a simulation event to test system responsiveness.
 * @param {string} type - Event type (e.g., 'crowd', 'gate', 'incident').
 * @param {string} action - Action to perform (e.g., 'surge', 'close').
 * @param {string|null} target - Optional target ID (e.g., gate ID).
 * @returns {Promise<Object>} Response from the server.
 */
export const triggerSimulationEvent = async (type, action, target = null) => {
  const response = await apiClient.post('/simulation/event', { type, action, target });
  return response.data;
};

/**
 * Resets the stadium state to its default simulation baseline.
 * @returns {Promise<Object>} Response from the server.
 */
export const resetSimulation = async () => {
  const response = await apiClient.post('/simulation/reset');
  return response.data;
};
