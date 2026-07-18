import {
  getGatesData,
  getCrowdDensityZones,
  getIncidentsData,
  getWeatherData,
  getMapConfigData,
} from '../services/map.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Get all gates and their real-time status.
 */
export const getGates = asyncHandler(async (req, res) => {
  const data = await getGatesData();
  res.status(200).json({ success: true, data });
});

/**
 * Get current crowd density across different stadium zones.
 */
export const getCrowdDensity = asyncHandler(async (req, res) => {
  const data = await getCrowdDensityZones();
  res.status(200).json({ success: true, data });
});

/**
 * Get active incidents reported in the stadium.
 */
export const getIncidents = asyncHandler(async (req, res) => {
  const data = await getIncidentsData();
  res.status(200).json({ success: true, data });
});

/**
 * Get current weather details for the stadium.
 */
export const getWeather = asyncHandler(async (req, res) => {
  const data = await getWeatherData();
  res.status(200).json({ success: true, data });
});

/**
 * Get map rendering configuration (bounds, initial center, zoom).
 */
export const getMapConfig = asyncHandler(async (req, res) => {
  const data = await getMapConfigData();
  res.status(200).json({ success: true, data });
});
