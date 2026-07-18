const cache = new Map();

/**
 * Express middleware to cache responses in memory.
 * @param {number} durationInSeconds - Cache duration
 */
export const cacheMiddleware = (durationInSeconds) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < durationInSeconds * 1000) {
      return res.json(cachedResponse.data);
    }

    // Override res.json to capture the response data
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode === 200) {
        cache.set(key, {
          data: body,
          timestamp: Date.now(),
        });
      }
      return originalJson(body);
    };

    next();
  };
};
