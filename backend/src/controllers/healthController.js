/**
 * @module healthController
 * @description Express controller for the API health check endpoint.
 * Used by monitoring systems and the CI/CD pipeline to verify the service is running.
 */

import { getHealthStatus } from '../services/healthService.js';
import { successResponse } from '../utils/response.js';

/**
 * Handles GET /health
 * Returns the current health status of the CrowdSense AI backend.
 * @function getHealth
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {import('express').Response} JSON response containing health status data.
 */
export const getHealth = (req, res) => {
  return successResponse(req, res, {
    message: 'CrowdSense AI backend is healthy.',
    data: getHealthStatus(),
  });
};
