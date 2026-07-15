import { Router } from 'express';
import { getGates, getCrowdDensity, getIncidents, getWeather, getMapConfig } from '../controllers/map.controller.js';

const router = Router();

router.get('/gates', getGates);
router.get('/crowd', getCrowdDensity);
router.get('/incidents', getIncidents);
router.get('/weather', getWeather);
router.get('/config', getMapConfig);

export default router;
