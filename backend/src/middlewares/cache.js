/**
 * @module cache
 * @description In-memory response caching middleware for Express.
 * Caches GET response bodies with a configurable TTL to reduce backend load.
 */

/** @type {Map<string, {data: *, timestamp: number}>} In-memory store for cached responses. */
const cache = new Map();

/**
 * Creates an Express middleware that caches successful GET responses in memory.
 * Only caches responses with HTTP status 200. Non-GET requests bypass the cache.
 * @param {number} durationInSeconds - How long to cache responses, in seconds.
 * @returns {import('express').RequestHandler} Express middleware function.
 * @example
 * // Cache /map/gates responses for 30 seconds
 * router.get('/gates', cacheMiddleware(30), getGates);
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
