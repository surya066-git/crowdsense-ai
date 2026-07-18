/**
 * @module asyncHandler
 * @description Utility wrapper for async Express route handlers to automatically
 * forward errors to the next error-handling middleware.
 */

/**
 * Wraps an asynchronous Express route handler to catch unhandled promise rejections
 * and forward them to Express's error handling middleware via `next(error)`.
 * @param {Function} handler - An async Express request handler `(req, res, next) => Promise`.
 * @returns {Function} A new Express middleware function with automatic error forwarding.
 * @example
 * router.get('/example', asyncHandler(async (req, res) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 */
export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
