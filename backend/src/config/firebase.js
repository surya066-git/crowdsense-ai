import { config } from './env.js';

export const firebaseConfig = Object.freeze({
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  credentialsPath: config.firebase.credentialsPath,
  isConfigured: Boolean(config.firebase.projectId && config.firebase.storageBucket),
});
