import { apiClient } from './apiClient.js';

/**
 * Fetches the status and locations of all stadium gates.
 * @returns {Promise<Array>} Array of gate objects.
 */
export const getGates = async () => {
  const response = await apiClient.get('/map/gates');
  return response.data.data;
};

/**
 * Fetches real-time crowd density data for different stadium zones.
 * @returns {Promise<Array>} Array of crowd density objects.
 */
export const getCrowdDensity = async () => {
  const response = await apiClient.get('/map/crowd');
  return response.data.data;
};

/**
 * Fetches active incidents within the stadium.
 * @returns {Promise<Array>} Array of incident objects.
 */
export const getIncidents = async () => {
  const response = await apiClient.get('/map/incidents');
  return response.data.data;
};

/**
 * Fetches current weather conditions at the stadium location.
 * @returns {Promise<Object>} Weather data object.
 */
export const getWeather = async () => {
  const response = await apiClient.get('/map/weather');
  return response.data.data;
};

/**
 * Fetches map configuration, including bounds and center coordinates.
 * @returns {Promise<Object>} Map configuration object.
 */
export const getMapConfig = async () => {
  const response = await apiClient.get('/map/config');
  return response.data.data;
};
