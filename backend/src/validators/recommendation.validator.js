import Joi from 'joi';

export const recommendationSchema = Joi.object({
  fanLocation: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required(),
  destinationSection: Joi.string().required(),
  stadiumId: Joi.string().required()
});

export const validateRecommendationRequest = (req, res, next) => {
  const { error } = recommendationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request data',
      details: error.details.map(err => err.message)
    });
  }
  next();
};
