import { Router } from 'express';
import { handleFileUpload, getHistory, deleteUpload } from '../../controllers/upload.controller.js';
import { uploadMiddleware } from '../../middlewares/upload.middleware.js';
import { uploadRateLimiter } from '../../middlewares/rateLimiter.js';

const router = Router();

router.use(uploadRateLimiter);

// Single file upload route
router.post('/', uploadMiddleware.single('file'), handleFileUpload);

// Get upload history
router.get('/history', getHistory);

// Delete upload record
router.delete('/:id', deleteUpload);

export default router;
