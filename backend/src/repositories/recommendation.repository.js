import { getFirestore } from '../firebase/admin.js';
import { logger } from '../utils/logger.js';

export const saveRecommendationHistory = async (recommendation) => {
  try {
    const db = getFirestore();
    await db.collection('recommendations').doc(recommendation.recommendationId).set({
      ...recommendation,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    // We log but don't fail the API request if history saving fails
    logger.error(`Failed to save recommendation to Firestore: ${error.message}`);
  }
};
