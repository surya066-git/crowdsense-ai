import { getGates, getCrowdDensity, getIncidents, getWeather, getMapConfig } from './mapService';
import { apiClient } from './apiClient';

vi.mock('./apiClient', () => ({ apiClient: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() } }));

describe('mapService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('getGates should call /map/gates and return data', async () => {
    const mockData = { data: { data: [{ id: 1, name: 'Gate A' }] } };
    apiClient.get.mockResolvedValue(mockData);

    const result = await getGates();

    expect(apiClient.get).toHaveBeenCalledWith('/map/gates');
    expect(result).toEqual(mockData.data.data);
  });

  it('getCrowdDensity should call /map/crowd and return data', async () => {
    const mockData = { data: { data: { heat: 100 } } };
    apiClient.get.mockResolvedValue(mockData);

    const result = await getCrowdDensity();

    expect(apiClient.get).toHaveBeenCalledWith('/map/crowd');
    expect(result).toEqual(mockData.data.data);
  });

  it('getIncidents should call /map/incidents and return data', async () => {
    const mockData = { data: { data: [{ id: 1, type: 'Issue' }] } };
    apiClient.get.mockResolvedValue(mockData);

    const result = await getIncidents();

    expect(apiClient.get).toHaveBeenCalledWith('/map/incidents');
    expect(result).toEqual(mockData.data.data);
  });

  it('getWeather should call /map/weather and return data', async () => {
    const mockData = { data: { data: { temp: 72 } } };
    apiClient.get.mockResolvedValue(mockData);

    const result = await getWeather();

    expect(apiClient.get).toHaveBeenCalledWith('/map/weather');
    expect(result).toEqual(mockData.data.data);
  });

  it('getMapConfig should call /map/config and return data', async () => {
    const mockData = { data: { data: { center: [0, 0] } } };
    apiClient.get.mockResolvedValue(mockData);

    const result = await getMapConfig();

    expect(apiClient.get).toHaveBeenCalledWith('/map/config');
    expect(result).toEqual(mockData.data.data);
  });
});
