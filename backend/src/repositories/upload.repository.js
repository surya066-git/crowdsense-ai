import { getFirestore } from '../firebase/admin.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'uploads';

export const saveUploadMetadata = async (metadata) => {
  try {
    const db = getFirestore();
    const id = uuidv4();
    const docRef = db.collection(COLLECTION_NAME).doc(id);
    
    const data = {
      id,
      ...metadata,
      createdAt: new Date().toISOString()
    };
    
    await docRef.set(data);
    logger.info(`Upload metadata saved to Firestore with ID: ${id}`);
    
    return data;
  } catch (error) {
    logger.error('Error saving upload metadata:', error);
    throw new Error('Database operation failed');
  }
};

export const getUploadHistory = async () => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').limit(20).get();
    
    if (snapshot.empty) {
      return [];
    }
    
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    logger.error('Error fetching upload history:', error);
    throw new Error('Database operation failed');
  }
};

export const deleteUploadRecord = async (id) => {
  try {
    const db = getFirestore();
    await db.collection(COLLECTION_NAME).doc(id).delete();
    logger.info(`Upload metadata deleted: ${id}`);
    return true;
  } catch (error) {
    logger.error('Error deleting upload metadata:', error);
    throw new Error('Database operation failed');
  }
};
