import { uploadFile, getUploadHistory, deleteUpload } from './uploadService';
import { apiClient } from './apiClient';

vi.mock('./apiClient', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }));

describe('uploadService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload a file and return response', async () => {
      // Mock File object isn't perfectly available in Node/Jest without polyfill, 
      // but FormData uses it normally in JS environments. Using a blob is safer.
      const mockBlob = new Blob(['content'], { type: 'image/png' });
      const mockData = { data: { success: true, fileId: '123' } };
      apiClient.post.mockResolvedValue(mockData);

      const result = await uploadFile(mockBlob);

      expect(apiClient.post).toHaveBeenCalledWith('/uploads', expect.any(FormData), expect.objectContaining({
        headers: { 'Content-Type': 'multipart/form-data' },
      }));
      expect(result).toEqual(mockData.data);
    });

    it('should call onUploadProgress if provided', async () => {
      const mockBlob = new Blob(['content'], { type: 'image/png' });
      apiClient.post.mockImplementation((url, formData, config) => {
        if (config.onUploadProgress) {
          config.onUploadProgress({ loaded: 50, total: 100 });
        }
        return Promise.resolve({ data: { success: true } });
      });

      const onProgress = vi.fn();
      await uploadFile(mockBlob, onProgress);

      expect(onProgress).toHaveBeenCalledWith(50);
    });
  });

  describe('getUploadHistory', () => {
    it('should call /uploads/history and return data', async () => {
      const mockData = { data: [{ id: '1' }] };
      apiClient.get.mockResolvedValue(mockData);

      const result = await getUploadHistory();

      expect(apiClient.get).toHaveBeenCalledWith('/uploads/history');
      expect(result).toEqual(mockData.data);
    });
  });

  describe('deleteUpload', () => {
    it('should call delete on /uploads/:id', async () => {
      const mockData = { data: { success: true } };
      apiClient.delete.mockResolvedValue(mockData);

      const result = await deleteUpload('123');

      expect(apiClient.delete).toHaveBeenCalledWith('/uploads/123');
      expect(result).toEqual(mockData.data);
    });
  });
});
