import { config } from '../config/env.js';
import { firebaseConfig } from '../config/firebase.js';

export const getHealthStatus = () => ({
  service: config.app.name,
  status: 'ok',
  environment: config.app.env,
  apiVersion: config.app.apiVersion,
  uptimeSeconds: Math.round(process.uptime()),
  checks: {
    firebaseConfigured: firebaseConfig.isConfigured,
    demoModeEnabled: config.app.enableDemoMode,
  },
});
