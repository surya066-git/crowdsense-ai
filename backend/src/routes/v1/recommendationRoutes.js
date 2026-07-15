import { Router } from 'express';
import { getRecommendation } from '../../controllers/recommendation.controller.js';
import { validateRecommendationRequest } from '../../validators/recommendation.validator.js';

const router = Router();

router.post('/', validateRecommendationRequest, getRecommendation);

export default router;
