/**
 * @module dateFormatter
 * @description Utility functions for formatting date values using the Internationalization API.
 */

/**
 * Formats a date value into a human-readable string (e.g., "Jan 1, 2024").
 * @param {string|Date|number} value - The date value to format.
 * @param {string} [locale='en-US'] - The BCP 47 locale string to use for formatting.
 * @returns {string} The formatted date string, or 'Not available' if the value is falsy.
 * @example
 * formatDate('2024-01-15'); // 'Jan 15, 2024'
 * formatDate(null);        // 'Not available'
 */
export const formatDate = (value, locale = 'en-US') => {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};
