/**
 * @module upload.controller
 * @description Express controllers for handling file uploads, history retrieval,
 * and deletion of upload records.
 */

import { processFileUpload, fetchUploadHistory, removeUpload } from '../services/upload.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Handles POST /uploads
 * Accepts a multipart file upload, processes it (parse + store), and
 * returns the created upload record.
 * @function handleFileUpload
 * @param {import('express').Request} req - Express request with `req.file` set by multer.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with the created upload record.
 */
export const handleFileUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  const record = await processFileUpload(file, 'Admin');

  res.status(201).json({
    success: true,
    message: 'File uploaded and processed successfully',
    data: record,
  });
});

/**
 * Handles GET /uploads/history
 * Retrieves a list of all previously uploaded file records.
 * @function getHistory
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with array of upload history records.
 */
export const getHistory = asyncHandler(async (req, res) => {
  const history = await fetchUploadHistory();

  res.status(200).json({
    success: true,
    data: history,
  });
});

/**
 * Handles DELETE /uploads/:id
 * Removes a specific upload record by its identifier.
 * @function deleteUpload
 * @param {import('express').Request} req - Express request with `req.params.id`.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response confirming successful deletion.
 */
export const deleteUpload = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await removeUpload(id);

  res.status(200).json({
    success: true,
    message: 'Upload record deleted successfully',
  });
});
