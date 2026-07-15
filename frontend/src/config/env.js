const getBoolean = (value, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
};

const getNumber = (value, fallback) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

export const env = Object.freeze({
  appName: import.meta.env.VITE_APP_NAME || 'CrowdSense AI',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  apiTimeoutMs: getNumber(import.meta.env.VITE_API_TIMEOUT_MS, 30000),
  enableDemoMode: getBoolean(import.meta.env.VITE_ENABLE_DEMO_MODE, true),
});
