import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/upload.service.js', () => ({
  processFileUpload: jest.fn(),
  fetchUploadHistory: jest.fn(),
  removeUpload: jest.fn(),
}));

const uploadService = await import('../../services/upload.service.js');
const { handleFileUpload, getHistory, deleteUpload } = await import('../../controllers/upload.controller.js');

describe('Upload Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      file: { originalname: 'test.csv' },
      params: { id: '123' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('handleFileUpload should process file upload', async () => {
    const mockData = { id: '456' };
    uploadService.processFileUpload.mockResolvedValue(mockData);

    await handleFileUpload(req, res, next);

    expect(uploadService.processFileUpload).toHaveBeenCalledWith(req.file, 'Admin');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'File uploaded and processed successfully',
      data: mockData,
    });
  });

  it('getHistory should return upload history', async () => {
    const mockData = [{ id: '456' }];
    uploadService.fetchUploadHistory.mockResolvedValue(mockData);

    await getHistory(req, res, next);

    expect(uploadService.fetchUploadHistory).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('deleteUpload should remove an upload', async () => {
    uploadService.removeUpload.mockResolvedValue(true);

    await deleteUpload(req, res, next);

    expect(uploadService.removeUpload).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Upload record deleted successfully',
    });
  });
});
