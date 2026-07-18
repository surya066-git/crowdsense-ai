import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/parser.service.js', () => ({
  validateFileContext: jest.fn().mockResolvedValue(true)
}));
jest.unstable_mockModule('../../services/storage.service.js', () => ({
  uploadFileToStorage: jest.fn().mockResolvedValue('gs://bucket/path')
}));
jest.unstable_mockModule('../../repositories/upload.repository.js', () => ({
  saveUploadMetadata: jest.fn().mockResolvedValue({ id: '1' }),
  getUploadHistory: jest.fn().mockResolvedValue([]),
  deleteUploadRecord: jest.fn().mockResolvedValue(true)
}));
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));

const { processFileUpload, fetchUploadHistory, removeUpload } = await import('../../services/upload.service.js');
const { saveUploadMetadata } = await import('../../repositories/upload.repository.js');

describe('Upload Service', () => {
  it('should throw if no file provided', async () => {
    await expect(processFileUpload(null)).rejects.toThrow('No file provided');
  });

  it('should process file upload successfully', async () => {
    const file = { originalname: 'test.csv', mimetype: 'text/csv', size: 100 };
    const res = await processFileUpload(file);
    expect(res.id).toBe('1');
    expect(saveUploadMetadata).toHaveBeenCalled();
  });

  it('should fetch history', async () => {
    const res = await fetchUploadHistory();
    expect(res).toEqual([]);
  });

  it('should remove upload', async () => {
    const res = await removeUpload('1');
    expect(res).toBe(true);
  });
});
