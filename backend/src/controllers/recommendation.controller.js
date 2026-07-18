import { processRecommendation } from '../services/recommendation.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getRecommendation = asyncHandler(async (req, res) => {
  const { fanLocation, destinationSection, stadiumId } = req.body;

  try {
    const userId = req.user?.uid;
    const recommendation = await processRecommendation(fanLocation, destinationSection, stadiumId, userId);
    
    res.status(200).json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    if (error.message === 'ALL_GATES_CLOSED_OR_UNSAFE') {
      return res.status(409).json({
        success: false,
        message: 'No safe gates available. Please stand by for stadium announcements.'
      });
    }
    throw error; // Let the global error handler catch it
  }
});
