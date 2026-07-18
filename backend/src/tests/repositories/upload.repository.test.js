import { jest } from '@jest/globals';

jest.unstable_mockModule('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

jest.unstable_mockModule('../../firebase/admin.js', () => {
  const setMock = jest.fn();
  const getMock = jest.fn();
  const deleteMock = jest.fn();
  
  const limitMock = jest.fn().mockReturnValue({ get: getMock });
  const orderByMock = jest.fn().mockReturnValue({ limit: limitMock });
  const docMock = jest.fn().mockReturnValue({ set: setMock, delete: deleteMock });
  const collectionMock = jest.fn().mockReturnValue({ doc: docMock, orderBy: orderByMock });
  
  return {
    getFirestore: jest.fn().mockReturnValue({
      collection: collectionMock
    }),
    _setMock: setMock,
    _getMock: getMock,
    _deleteMock: deleteMock,
  };
});

jest.unstable_mockModule('../../utils/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

const adminModule = await import('../../firebase/admin.js');
const loggerModule = await import('../../utils/logger.js');
const { saveUploadMetadata, getUploadHistory, deleteUploadRecord } = await import('../../repositories/upload.repository.js');

describe('Upload Repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUploadMetadata', () => {
    it('should save upload metadata and return data', async () => {
      adminModule._setMock.mockResolvedValue();
      const metadata = { filename: 'test.csv' };

      const result = await saveUploadMetadata(metadata);

      expect(adminModule.getFirestore).toHaveBeenCalled();
      expect(adminModule._setMock).toHaveBeenCalled();
      expect(result).toHaveProperty('id', 'mocked-uuid');
      expect(result).toHaveProperty('filename', 'test.csv');
      expect(result).toHaveProperty('createdAt');
      expect(loggerModule.logger.info).toHaveBeenCalledWith('Upload metadata saved to Firestore with ID: mocked-uuid');
    });

    it('should throw error if saving fails', async () => {
      adminModule._setMock.mockRejectedValue(new Error('DB Error'));
      const metadata = { filename: 'test.csv' };

      await expect(saveUploadMetadata(metadata)).rejects.toThrow('Database operation failed');
      expect(loggerModule.logger.error).toHaveBeenCalled();
    });
  });

  describe('getUploadHistory', () => {
    it('should return empty array if no history', async () => {
      adminModule._getMock.mockResolvedValue({ empty: true });

      const result = await getUploadHistory();

      expect(result).toEqual([]);
    });

    it('should return history data', async () => {
      const mockDocs = [{ data: () => ({ id: '1' }) }, { data: () => ({ id: '2' }) }];
      adminModule._getMock.mockResolvedValue({ empty: false, docs: mockDocs });

      const result = await getUploadHistory();

      expect(result).toEqual([{ id: '1' }, { id: '2' }]);
    });

    it('should throw error if fetching fails', async () => {
      adminModule._getMock.mockRejectedValue(new Error('DB Error'));

      await expect(getUploadHistory()).rejects.toThrow('Database operation failed');
      expect(loggerModule.logger.error).toHaveBeenCalled();
    });
  });

  describe('deleteUploadRecord', () => {
    it('should delete upload metadata', async () => {
      adminModule._deleteMock.mockResolvedValue();

      const result = await deleteUploadRecord('123');

      expect(adminModule.getFirestore).toHaveBeenCalled();
      expect(adminModule._deleteMock).toHaveBeenCalled();
      expect(result).toBe(true);
      expect(loggerModule.logger.info).toHaveBeenCalledWith('Upload metadata deleted: 123');
    });

    it('should throw error if deletion fails', async () => {
      adminModule._deleteMock.mockRejectedValue(new Error('DB Error'));

      await expect(deleteUploadRecord('123')).rejects.toThrow('Database operation failed');
      expect(loggerModule.logger.error).toHaveBeenCalled();
    });
  });
});
