import csv from 'csv-parser';
import { Readable } from 'stream';
import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';

const SCHEMAS = {
  'crowd.csv': ['Gate ID', 'Crowd Density', 'Timestamp'],
  'gates.csv': ['Gate ID', 'Gate Name', 'Latitude', 'Longitude', 'Status', 'Capacity'],
  'incidents.csv': ['Incident ID', 'Incident Type', 'Severity', 'Affected Gate', 'Timestamp'],
};

export const parseCSV = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    let headersChecked = false;
    let isValid = true;
    let missingColumns = [];

    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on('headers', (headers) => {
        const requiredHeaders = SCHEMAS[filename];
        if (requiredHeaders) {
          missingColumns = requiredHeaders.filter((h) => !headers.includes(h));
          if (missingColumns.length > 0) {
            isValid = false;
          }
        }
        headersChecked = true;
      })
      .on('data', (data) => {
        if (isValid) {
          results.push(data);
        }
      })
      .on('end', () => {
        if (!isValid) {
          reject(
            new AppError(
              `Missing required columns in ${filename}: ${missingColumns.join(', ')}`,
              400,
            ),
          );
        } else if (results.length === 0) {
          reject(new AppError(`File ${filename} is empty or has invalid data format`, 400));
        } else {
          resolve(results);
        }
      })
      .on('error', (error) => {
        logger.error(`Error parsing CSV ${filename}:`, error);
        reject(new AppError(`Failed to parse ${filename}: ${error.message}`, 400));
      });
  });
};

export const parseJSON = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(buffer.toString('utf-8'));

      if (filename === 'weather.json') {
        const requiredKeys = ['Temperature', 'Rain', 'Wind', 'Visibility'];
        const keys = Object.keys(data);
        const missing = requiredKeys.filter((k) => !keys.includes(k));

        if (missing.length > 0) {
          return reject(
            new AppError(`Missing required keys in weather.json: ${missing.join(', ')}`, 400),
          );
        }
      }

      resolve(data);
    } catch (error) {
      logger.error(`Error parsing JSON ${filename}:`, error);
      reject(new AppError(`Malformed JSON in ${filename}`, 400));
    }
  });
};

export const validateFileContext = async (file) => {
  const { originalname, buffer } = file;

  if (originalname.endsWith('.csv')) {
    if (!SCHEMAS[originalname]) {
      throw new AppError(
        `Unsupported CSV file: ${originalname}. Supported are: crowd.csv, gates.csv, incidents.csv`,
        400,
      );
    }
    await parseCSV(buffer, originalname);
  } else if (originalname.endsWith('.json')) {
    if (originalname !== 'weather.json') {
      throw new AppError(`Unsupported JSON file: ${originalname}. Supported is: weather.json`, 400);
    }
    await parseJSON(buffer, originalname);
  } else {
    throw new AppError(`Unsupported file extension for ${originalname}`, 400);
  }

  return true;
};
