import { Router } from 'express';
import { config } from '../config/env.js';
import { API_ROOT } from '../constants/api.js';
import v1Routes from './v1/index.js';

const router = Router();

router.use(`${API_ROOT}/${config.app.apiVersion}`, v1Routes);

export default router;
