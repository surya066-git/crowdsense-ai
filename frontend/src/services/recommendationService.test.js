import { getRecommendation } from './recommendationService';
import { apiClient } from './apiClient';

vi.mock('./apiClient', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }));

describe('recommendationService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('getRecommendation should call /recommendations and return data', async () => {
    const payload = { fanLocation: { lat: 10, lng: 20 }, destinationSection: 'A1', stadiumId: '123' };
    const mockData = { data: { data: { gate: 'Gate A', path: [] } } };
    apiClient.post.mockResolvedValue(mockData);

    const result = await getRecommendation(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/recommendations', payload);
    expect(result).toEqual(mockData.data.data);
  });
});
