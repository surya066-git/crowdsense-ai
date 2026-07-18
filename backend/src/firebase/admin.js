import admin from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { getStorage as getAdminStorage } from 'firebase-admin/storage';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

let firebaseApp = null;

export const hasFirebaseAdminCredentials = () =>
  Boolean(
    config.firebase.credentialsPath ||
      process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      process.env.K_SERVICE ||
      process.env.GAE_SERVICE,
  );

const getInlineCredential = () => {
  const rawCredentials = config.firebase.credentialsPath?.trim();

  if (!rawCredentials?.startsWith('{')) {
    return null;
  }

  try {
    return admin.credential.cert(JSON.parse(rawCredentials));
  } catch (error) {
    logger.error('Invalid Firebase service account JSON in GOOGLE_APPLICATION_CREDENTIALS.', {
      error: error.message,
    });
    throw error;
  }
};

export const initializeFirebaseAdmin = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const options = {};
  const inlineCredential = getInlineCredential();

  if (inlineCredential) {
    options.credential = inlineCredential;
  }

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

export const getFirestore = () => getAdminFirestore(initializeFirebaseAdmin());

export const getStorage = () => getAdminStorage(initializeFirebaseAdmin());

export const getAuth = () => getAdminAuth(initializeFirebaseAdmin());
