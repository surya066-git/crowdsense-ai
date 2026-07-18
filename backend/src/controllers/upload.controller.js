import { processFileUpload, fetchUploadHistory, removeUpload } from '../services/upload.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const handleFileUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  const record = await processFileUpload(file, 'Admin');

  res.status(201).json({
    success: true,
    message: 'File uploaded and processed successfully',
    data: record,
  });
});

export const getHistory = asyncHandler(async (req, res) => {
  const history = await fetchUploadHistory();

  res.status(200).json({
    success: true,
    data: history,
  });
});

export const deleteUpload = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await removeUpload(id);

  res.status(200).json({
    success: true,
    message: 'Upload record deleted successfully',
  });
});
