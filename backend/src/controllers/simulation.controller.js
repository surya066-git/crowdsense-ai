import { processSimulationEvent } from '../services/simulation.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const triggerEvent = asyncHandler(async (req, res) => {
  const result = await processSimulationEvent(req.body);
  res.status(200).json({ success: true, ...result });
});

export const resetSimulation = asyncHandler(async (req, res) => {
  const result = await processSimulationEvent({ type: 'RESET' });
  res.status(200).json({ success: true, ...result });
});
