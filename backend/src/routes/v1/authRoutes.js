import { Router } from 'express';
import { createPlaceholderController } from '../../controllers/placeholderController.js';

const router = Router();

router.get('/', createPlaceholderController('Authentication'));

export default router;
