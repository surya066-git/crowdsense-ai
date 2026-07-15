import { apiClient } from './apiClient.js';

export const getGates = async () => {
  const response = await apiClient.get('/map/gates');
  return response.data.data;
};

export const getCrowdDensity = async () => {
  const response = await apiClient.get('/map/crowd');
  return response.data.data;
};

export const getIncidents = async () => {
  const response = await apiClient.get('/map/incidents');
  return response.data.data;
};

export const getWeather = async () => {
  const response = await apiClient.get('/map/weather');
  return response.data.data;
};

export const getMapConfig = async () => {
  const response = await apiClient.get('/map/config');
  return response.data.data;
};
