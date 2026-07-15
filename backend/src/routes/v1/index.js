import { Router } from 'express';
import { API_MODULES } from '../../constants/api.js';
import authRoutes from './authRoutes.js';
import demoSessionRoutes from './demoSessionRoutes.js';
import gateRoutes from './gateRoutes.js';
import healthRoutes from './healthRoutes.js';
import incidentRoutes from './incidentRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import stadiumRoutes from './stadiumRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import weatherRoutes from './weatherRoutes.js';
import mapRoutes from '../map.routes.js';
import simulationRoutes from '../simulation.routes.js';

const router = Router();

router.use(`/${API_MODULES.HEALTH}`, healthRoutes);
router.use(`/${API_MODULES.AUTH}`, authRoutes);
router.use(`/${API_MODULES.UPLOADS}`, uploadRoutes);
router.use(`/${API_MODULES.RECOMMENDATIONS}`, recommendationRoutes);
router.use(`/${API_MODULES.STADIUMS}`, stadiumRoutes);
router.use(`/${API_MODULES.GATES}`, gateRoutes);
router.use(`/${API_MODULES.INCIDENTS}`, incidentRoutes);
router.use(`/${API_MODULES.WEATHER}`, weatherRoutes);
router.use(`/${API_MODULES.DEMO_SESSIONS}`, demoSessionRoutes);
router.use('/map', mapRoutes);
router.use('/simulation', simulationRoutes);

export default router;
