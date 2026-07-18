import { Router } from 'express';
import { getRecommendation } from '../../controllers/recommendation.controller.js';
import { validateRecommendationRequest } from '../../validators/recommendation.validator.js';

import { authenticate } from '../../middlewares/authentication.js';

const router = Router();

router.post('/', authenticate, validateRecommendationRequest, getRecommendation);

export default router;
