import { validateFileContext } from './parser.service.js';
import { uploadFileToStorage } from './storage.service.js';
import {
  saveUploadMetadata,
  getUploadHistory,
  deleteUploadRecord,
} from '../repositories/upload.repository.js';
import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';

export const processFileUpload = async (file, uploader = 'Admin') => {
  if (!file) {
    throw new AppError('No file provided for upload', 400);
  }

  // 1. Frontend validation is already done, now Backend validation
  logger.info(`Starting validation for file: ${file.originalname}`);
  await validateFileContext(file);
  logger.info(`Validation successful for: ${file.originalname}`);

  // 2. Upload to Firebase Storage
  logger.info(`Uploading to Firebase Storage: ${file.originalname}`);
  const storagePath = await uploadFileToStorage(file);

  // 3. Save metadata to Firestore
  logger.info(`Saving metadata to Firestore for: ${file.originalname}`);
  const metadata = {
    fileName: file.originalname,
    fileType: file.mimetype,
    size: file.size,
    status: 'SUCCESS',
    uploader,
    storagePath,
    validationResult: 'Passed',
  };

  const savedRecord = await saveUploadMetadata(metadata);

  return savedRecord;
};

export const fetchUploadHistory = async () => {
  return await getUploadHistory();
};

export const removeUpload = async (id) => {
  return await deleteUploadRecord(id);
};
