import { AppError } from '../errors/AppError.js';

const formatValidationDetails = (details) =>
  details.map((detail) => ({
    message: detail.message,
    path: detail.path.join('.'),
    type: detail.type,
  }));

export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const { value, error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      throw AppError.validation(
        'Request validation failed.',
        formatValidationDetails(error.details),
      );
    }

    req[source] = value;
    next();
  };
