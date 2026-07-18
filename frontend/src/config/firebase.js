import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from './env.js';

// If API key is missing, Firebase initialization will throw an error,
// so we should check if it's configured. In a complete application,
// you might want to display a fallback UI if Firebase is not configured.
const isFirebaseConfigured = !!env.firebase.apiKey;

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(env.firebase);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.warn('Firebase configuration is missing in environment variables. Authentication and Firestore features will be disabled.');
}

export { app, auth, db, isFirebaseConfigured };
