/**
 * @module statusFormatter
 * @description Utility functions for formatting and deriving UI tone from status values.
 */

import { STATUS_LABELS, STATUS_VARIANTS } from '../constants/status.js';

/**
 * Returns a human-readable label for a given status variant.
 * Falls back to the PENDING label if the status is unknown.
 * @param {string} status - The status variant key (e.g., 'READY', 'DANGER').
 * @returns {string} The display label for the status.
 * @example
 * formatStatusLabel('READY');   // 'Ready'
 * formatStatusLabel('UNKNOWN'); // 'Pending' (fallback)
 */
export const formatStatusLabel = (status) =>
  STATUS_LABELS[status] || STATUS_LABELS[STATUS_VARIANTS.PENDING];

/**
 * Derives an MUI color tone (severity) from a status variant.
 * Used to set the color of status chips, alerts, and badges.
 * @param {string} status - The status variant key.
 * @returns {'success'|'warning'|'error'|'default'} The corresponding MUI color tone.
 * @example
 * getStatusTone('READY');   // 'success'
 * getStatusTone('WARNING'); // 'warning'
 * getStatusTone('DANGER');  // 'error'
 * getStatusTone('INFO');    // 'default'
 */
export const getStatusTone = (status) => {
  if ([STATUS_VARIANTS.READY, STATUS_VARIANTS.ACTIVE].includes(status)) {
    return 'success';
  }

  if (status === STATUS_VARIANTS.WARNING || status === STATUS_VARIANTS.PENDING) {
    return 'warning';
  }

  if (status === STATUS_VARIANTS.DANGER) {
    return 'error';
  }

  return 'default';
};
