/**
 * @module map.controller
 * @description Express controllers for real-time stadium map data endpoints.
 * Provides gate status, crowd density, incidents, weather, and map configuration.
 */

import {
  getGatesData,
  getCrowdDensityZones,
  getIncidentsData,
  getWeatherData,
  getMapConfigData,
} from '../services/map.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Handles GET /map/gates
 * Returns all stadium gates with their real-time operational status and crowd levels.
 * @function getGates
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with array of gate data objects.
 */
export const getGates = asyncHandler(async (req, res) => {
  const data = await getGatesData();
  res.status(200).json({ success: true, data });
});

/**
 * Handles GET /map/crowd
 * Returns crowd density measurements across all stadium zones.
 * @function getCrowdDensity
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with crowd density zone data.
 */
export const getCrowdDensity = asyncHandler(async (req, res) => {
  const data = await getCrowdDensityZones();
  res.status(200).json({ success: true, data });
});

/**
 * Handles GET /map/incidents
 * Returns all active safety incidents reported in or near the stadium.
 * @function getIncidents
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with array of active incidents.
 */
export const getIncidents = asyncHandler(async (req, res) => {
  const data = await getIncidentsData();
  res.status(200).json({ success: true, data });
});

/**
 * Handles GET /map/weather
 * Returns current weather conditions at the stadium location.
 * @function getWeather
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with weather data.
 */
export const getWeather = asyncHandler(async (req, res) => {
  const data = await getWeatherData();
  res.status(200).json({ success: true, data });
});

/**
 * Handles GET /map/config
 * Returns the map rendering configuration including center coordinates, zoom, and bounds.
 * @function getMapConfig
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>} JSON response with map configuration object.
 */
export const getMapConfig = asyncHandler(async (req, res) => {
  const data = await getMapConfigData();
  res.status(200).json({ success: true, data });
});
