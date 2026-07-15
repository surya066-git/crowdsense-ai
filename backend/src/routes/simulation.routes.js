import { Router } from 'express';
import { triggerEvent, resetSimulation } from '../controllers/simulation.controller.js';

const router = Router();

router.post('/event', triggerEvent);
router.post('/reset', resetSimulation);

export default router;
