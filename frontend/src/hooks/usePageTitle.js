/**
 * @module usePageTitle
 * @description Custom React hook for dynamically setting the browser tab title.
 */

import { useEffect } from 'react';
import { env } from '../config/env.js';

/**
 * Custom hook that sets the document title whenever the provided title changes.
 * Appends the application name (from environment config) to the title.
 * @param {string} [title] - The page-specific title. If omitted, only the app name is shown.
 * @returns {void}
 * @example
 * // Inside a page component:
 * usePageTitle('Dashboard'); // Sets title to "Dashboard | CrowdSense AI"
 * usePageTitle();            // Sets title to "CrowdSense AI"
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${env.appName}` : env.appName;
  }, [title]);
};
