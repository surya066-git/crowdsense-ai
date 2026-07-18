/**
 * @module uploadService
 * @description Service functions for managing file uploads to the CrowdSense AI backend.
 */

import { apiClient } from './apiClient.js';

/**
 * Uploads a file to the backend for processing.
 * Supports progress tracking via an optional callback.
 * @param {File|Blob} file - The file or blob to upload.
 * @param {Function} [onUploadProgress] - Optional callback receiving upload progress as a percentage (0-100).
 * @returns {Promise<Object>} The server response data upon successful upload.
 * @example
 * await uploadFile(selectedFile, (pct) => console.log(`${pct}% uploaded`));
 */
export const uploadFile = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

/**
 * Retrieves the history of previously uploaded files.
 * @returns {Promise<Array>} An array of upload history records.
 */
export const getUploadHistory = async () => {
  const response = await apiClient.get('/uploads/history');
  return response.data;
};

/**
 * Deletes a specific upload record by its ID.
 * @param {string} id - The unique identifier of the upload to delete.
 * @returns {Promise<Object>} The server response confirming deletion.
 */
export const deleteUpload = async (id) => {
  const response = await apiClient.delete(`/uploads/${id}`);
  return response.data;
};
