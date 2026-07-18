import { jest } from '@jest/globals';

jest.unstable_mockModule('../../services/map.service.js', () => ({
  getGatesData: jest.fn(),
  getCrowdDensityZones: jest.fn(),
  getIncidentsData: jest.fn(),
  getWeatherData: jest.fn(),
  getMapConfigData: jest.fn(),
}));

const mapService = await import('../../services/map.service.js');
const { getGates, getCrowdDensity, getIncidents, getWeather, getMapConfig } = await import('../../controllers/map.controller.js');

describe('Map Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('getGates should return gates data', async () => {
    const mockData = [{ id: 1 }];
    mapService.getGatesData.mockResolvedValue(mockData);

    await getGates(req, res, next);

    expect(mapService.getGatesData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('getCrowdDensity should return crowd density data', async () => {
    const mockData = [{ zone: 'A' }];
    mapService.getCrowdDensityZones.mockResolvedValue(mockData);

    await getCrowdDensity(req, res, next);

    expect(mapService.getCrowdDensityZones).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('getIncidents should return incidents data', async () => {
    const mockData = [{ type: 'fire' }];
    mapService.getIncidentsData.mockResolvedValue(mockData);

    await getIncidents(req, res, next);

    expect(mapService.getIncidentsData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('getWeather should return weather data', async () => {
    const mockData = { temp: 20 };
    mapService.getWeatherData.mockResolvedValue(mockData);

    await getWeather(req, res, next);

    expect(mapService.getWeatherData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });

  it('getMapConfig should return map config data', async () => {
    const mockData = { center: [0, 0] };
    mapService.getMapConfigData.mockResolvedValue(mockData);

    await getMapConfig(req, res, next);

    expect(mapService.getMapConfigData).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: mockData });
  });
});
