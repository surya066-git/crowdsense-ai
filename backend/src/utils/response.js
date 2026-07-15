import { ApiResponse } from '../models/ApiResponse.js';

export const successResponse = (
  req,
  res,
  { statusCode = 200, message = 'Success', data = null, meta = undefined } = {},
) => {
  return res
    .status(statusCode)
    .json(ApiResponse.success({ message, data, meta, requestId: req.id }));
};
