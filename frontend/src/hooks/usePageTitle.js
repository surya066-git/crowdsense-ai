import { useEffect } from 'react';
import { env } from '../config/env.js';

export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${env.appName}` : env.appName;
  }, [title]);
};
