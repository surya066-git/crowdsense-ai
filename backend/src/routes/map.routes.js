import { Router } from 'express';
import {
  getGates,
  getCrowdDensity,
  getIncidents,
  getWeather,
  getMapConfig,
} from '../controllers/map.controller.js';
import { cacheMiddleware } from '../middlewares/cache.js';

const router = Router();

// Cache map data for 5 seconds to reduce load
router.get('/gates', cacheMiddleware(5), getGates);
router.get('/crowd', cacheMiddleware(5), getCrowdDensity);
router.get('/incidents', cacheMiddleware(5), getIncidents);
router.get('/weather', cacheMiddleware(5), getWeather);
router.get('/config', cacheMiddleware(3600), getMapConfig); // config rarely changes

export default router;
