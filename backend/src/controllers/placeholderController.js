import { successResponse } from '../utils/response.js';

export const createPlaceholderController = (moduleName) => (req, res) => {
  return successResponse(req, res, {
    message: `${moduleName} module is ready.`,
    data: {
      module: moduleName,
      status: 'placeholder',
      note: 'Business logic will be added in a later implementation phase.',
    },
  });
};
