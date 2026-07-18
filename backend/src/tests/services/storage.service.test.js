import { jest } from '@jest/globals';
import { Buffer } from 'buffer';

jest.unstable_mockModule('../../firebase/admin.js', () => ({
  getStorage: jest.fn()
}));
jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: { warn: jest.fn(), error: jest.fn(), info: jest.fn() }
}));
jest.unstable_mockModule('uuid', () => ({
  v4: () => '12345678-uuid'
}));

const { uploadFileToStorage } = await import('../../services/storage.service.js');
const { getStorage } = await import('../../firebase/admin.js');

describe('Storage Service', () => {
  it('should upload file successfully', async () => {
    const mockSave = jest.fn().mockResolvedValue();
    const mockFile = jest.fn().mockReturnValue({ save: mockSave });
    getStorage.mockReturnValue({
      bucket: () => ({ name: 'test-bucket', file: mockFile })
    });

    const file = {
      originalname: 'test.csv',
      mimetype: 'text/csv',
      buffer: Buffer.from('data')
    };

    const path = await uploadFileToStorage(file);
    expect(path).toContain('gs://test-bucket/test/12345678_test.csv');
    expect(mockSave).toHaveBeenCalled();
  });

  it('should throw error on failure', async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error('upload fail'));
    const mockFile = jest.fn().mockReturnValue({ save: mockSave });
    getStorage.mockReturnValue({
      bucket: () => ({ name: 'test-bucket', file: mockFile })
    });

    const file = { originalname: 'test.csv', buffer: Buffer.from('data') };
    await expect(uploadFileToStorage(file)).rejects.toThrow('Failed to upload file');
  });
});
