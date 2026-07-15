import { getHealthStatus } from '../services/healthService.js';
import { successResponse } from '../utils/response.js';

export const getHealth = (req, res) => {
  return successResponse(req, res, {
    message: 'CrowdSense AI backend is healthy.',
    data: getHealthStatus(),
  });
};
