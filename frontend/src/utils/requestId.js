/**
 * @module requestId
 * @description Utility for generating unique request identifiers for API calls.
 */

/**
 * Generates a unique request ID for correlating API requests and responses.
 * Uses the Web Crypto API's `randomUUID()` when available for maximum uniqueness.
 * Falls back to a timestamp + random string combination for environments without
 * native UUID support.
 * @returns {string} A unique request identifier string.
 * @example
 * createRequestId(); // '550e8400-e29b-41d4-a716-446655440000' (UUID)
 * createRequestId(); // 'req_1705312345678_abc123' (fallback)
 */
export const createRequestId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `req_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};
