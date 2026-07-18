/**
 * @module recommendation.controller
 * @description Express controller for AI-powered gate recommendation requests.
 */

import { processRecommendation } from '../services/recommendation.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Handles POST /recommendations
 * Processes a fan's location and destination to generate an optimal gate recommendation
 * using the AI Decision Engine (Gemini AI + crowd intelligence).
 *
 * @function getRecommendation
 * @param {import('express').Request} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {{ lat: number, lng: number }} req.body.fanLocation - The fan's current GPS coordinates.
 * @param {string} req.body.destinationSection - The stadium section the fan wants to reach.
 * @param {string} req.body.stadiumId - The stadium identifier.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with recommendation data or error message.
 * @throws {Error} Propagates unhandled errors to the global error handler.
 */
export const getRecommendation = asyncHandler(async (req, res) => {
  const { fanLocation, destinationSection, stadiumId } = req.body;

  try {
    const userId = req.user?.uid;
    const recommendation = await processRecommendation(
      fanLocation,
      destinationSection,
      stadiumId,
      userId,
    );

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    if (error.message === 'ALL_GATES_CLOSED_OR_UNSAFE') {
      return res.status(409).json({
        success: false,
        message: 'No safe gates available. Please stand by for stadium announcements.',
      });
    }
    throw error; // Let the global error handler catch it
  }
});
