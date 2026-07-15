import admin from 'firebase-admin';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

let firebaseApp = null;

export const initializeFirebaseAdmin = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const options = {};

  if (config.firebase.projectId) {
    options.projectId = config.firebase.projectId;
  }

  if (config.firebase.storageBucket) {
    options.storageBucket = config.firebase.storageBucket;
  }

  firebaseApp = admin.initializeApp(options);

  logger.info('Firebase Admin initialized.', {
    projectId: config.firebase.projectId || 'default-application-credentials',
    storageBucket: config.firebase.storageBucket || 'not-configured',
  });

  return firebaseApp;
};

export const getFirestore = () => initializeFirebaseAdmin().firestore();

export const getStorage = () => initializeFirebaseAdmin().storage();

export const getAuth = () => initializeFirebaseAdmin().auth();
