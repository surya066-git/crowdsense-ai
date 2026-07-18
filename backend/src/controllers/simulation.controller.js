/**
 * @module simulation.controller
 * @description Express controllers for stadium simulation event management.
 * Supports triggering custom events and resetting the simulation state.
 */

import { processSimulationEvent } from '../services/simulation.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Handles POST /simulation/event
 * Triggers a simulation event (e.g., crowd surge, gate closure, incident).
 * @function triggerEvent
 * @param {import('express').Request} req - Express request object.
 * @param {Object} req.body - Event payload with type, action, and optional target.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with simulation result data.
 */
export const triggerEvent = asyncHandler(async (req, res) => {
  const result = await processSimulationEvent(req.body);
  res.status(200).json({ success: true, ...result });
});

/**
 * Handles POST /simulation/reset
 * Resets the entire stadium simulation back to its baseline state.
 * @function resetSimulation
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response confirming the simulation reset.
 */
export const resetSimulation = asyncHandler(async (req, res) => {
  const result = await processSimulationEvent({ type: 'RESET' });
  res.status(200).json({ success: true, ...result });
});
