import path from 'path';
import multer from 'multer';
import { config } from '../config/env.js';
import { ALLOWED_FILE_EXTENSIONS, ALLOWED_MIME_TYPES } from '../constants/fileTypes.js';
import { AppError } from '../errors/AppError.js';
import { ERROR_CODES } from '../errors/errorCodes.js';

const memoryStorage = multer.memoryStorage();

const fileFilter = (_req, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const hasAllowedExtension = ALLOWED_FILE_EXTENSIONS.includes(extension);
  const hasAllowedMimeType = ALLOWED_MIME_TYPES.includes(file.mimetype);

  if (!hasAllowedExtension || !hasAllowedMimeType) {
    callback(
      new AppError('Unsupported upload file type.', 400, ERROR_CODES.UPLOAD_ERROR, {
        fileName: file.originalname,
        mimeType: file.mimetype,
        allowedExtensions: ALLOWED_FILE_EXTENSIONS,
      }),
    );
    return;
  }

  callback(null, true);
};

export const uploadMiddleware = multer({
  storage: memoryStorage,
  limits: {
    fileSize: config.upload.maxFileSizeBytes,
  },
  fileFilter,
});
