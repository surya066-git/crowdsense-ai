import { apiClient } from './apiClient.js';

export const triggerSimulationEvent = async (type, action, target = null) => {
  const response = await apiClient.post('/simulation/event', { type, action, target });
  return response.data;
};

export const resetSimulation = async () => {
  const response = await apiClient.post('/simulation/reset');
  return response.data;
};
