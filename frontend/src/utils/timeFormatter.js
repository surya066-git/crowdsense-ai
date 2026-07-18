/**
 * @module timeFormatter
 * @description Utility functions for formatting time, duration, and relative time values.
 */

/**
 * Formats a date/time value into a human-readable time string (e.g., "3:45 PM").
 * @param {string|Date|number} value - The date/time value to format.
 * @param {string} [locale='en-US'] - The BCP 47 locale string to use for formatting.
 * @returns {string} The formatted time string, or 'Not available' if the value is falsy.
 * @example
 * formatTime('2024-01-15T15:45:00Z'); // '3:45 PM'
 * formatTime(null);                   // 'Not available'
 */
export const formatTime = (value, locale = 'en-US') => {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
};

/**
 * Formats a duration in minutes to a human-readable string (e.g., "1 hr 30 min").
 * @param {number} minutes - The duration in minutes.
 * @returns {string} The formatted duration string, or 'Not available' for non-finite values.
 * @example
 * formatDuration(45);  // '45 min'
 * formatDuration(90);  // '1 hr 30 min'
 * formatDuration(120); // '2 hr'
 */
export const formatDuration = (minutes) => {
  if (!Number.isFinite(minutes)) {
    return 'Not available';
  }

  if (minutes < 60) {
    return `${Math.round(minutes)} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
};

/**
 * Returns a human-readable relative time string (e.g., "5 minutes ago").
 * @param {Date|string|number} date - The past date to compare against now.
 * @returns {string} A relative time string or 'Unknown' if the value is falsy.
 * @example
 * formatTimeAgo(new Date(Date.now() - 60000)); // '1 minutes ago'
 */
export const formatTimeAgo = (date) => {
  if (!date) return 'Unknown';
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
};
