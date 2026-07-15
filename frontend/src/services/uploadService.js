import { apiClient } from './apiClient.js';

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

export const getUploadHistory = async () => {
  const response = await apiClient.get('/uploads/history');
  return response.data;
};

export const deleteUpload = async (id) => {
  const response = await apiClient.delete(`/uploads/${id}`);
  return response.data;
};
