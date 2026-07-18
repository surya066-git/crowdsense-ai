import { getStorage } from '../firebase/admin.js';
import { logger } from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileToStorage = async (file) => {
  try {
    const storage = getStorage();
    const bucket = storage.bucket();

    // Determine folder based on filename (e.g., crowd.csv -> crowd/)
    const folder = file.originalname.split('.')[0];
    const version = uuidv4().substring(0, 8);
    const destination = `${folder}/${version}_${file.originalname}`;

    const fileRef = bucket.file(destination);

    await fileRef.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
        },
      },
    });

    // Make the file publicly accessible or get a signed URL
    // For this context, we just return the storage path
    const storagePath = `gs://${bucket.name}/${destination}`;
    logger.info(`File uploaded successfully to ${storagePath}`);

    return storagePath;
  } catch (error) {
    logger.error('Error uploading file to Firebase Storage:', error);
    throw new Error('Failed to upload file to storage');
  }
};
