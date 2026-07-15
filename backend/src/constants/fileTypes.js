export const SUPPORTED_UPLOAD_TYPES = Object.freeze({
  CROWD: 'crowd',
  GATES: 'gates',
  INCIDENTS: 'incidents',
  WEATHER: 'weather',
});

export const ALLOWED_FILE_EXTENSIONS = Object.freeze(['.csv', '.json']);

export const ALLOWED_MIME_TYPES = Object.freeze([
  'text/csv',
  'application/csv',
  'application/json',
  'text/plain',
]);
