import { getGatesData, getCrowdDensityZones, getIncidentsData, getWeatherData, getMapConfigData } from '../services/map.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getGates = asyncHandler(async (req, res) => {
  const data = await getGatesData();
  res.status(200).json({ success: true, data });
});

export const getCrowdDensity = asyncHandler(async (req, res) => {
  const data = await getCrowdDensityZones();
  res.status(200).json({ success: true, data });
});

export const getIncidents = asyncHandler(async (req, res) => {
  const data = await getIncidentsData();
  res.status(200).json({ success: true, data });
});

export const getWeather = asyncHandler(async (req, res) => {
  const data = await getWeatherData();
  res.status(200).json({ success: true, data });
});

export const getMapConfig = asyncHandler(async (req, res) => {
  const data = await getMapConfigData();
  res.status(200).json({ success: true, data });
});
