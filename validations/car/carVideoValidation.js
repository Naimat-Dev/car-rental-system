import Joi from 'joi';

const carVideoValidationSchema = Joi.object({
  carId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Car ID is required.',
      'number.base': 'Car ID must be a number.',
      'number.integer': 'Car ID must be an integer.',
      'number.positive': 'Car ID must be a positive number.',
    }),
  videourl: Joi.string()
    .max(255)
    .required()
    .messages({
      'any.required': 'Video URL is required.',
      'string.max': 'Video URL cannot exceed 255 characters.',
      'string.empty': 'Video URL cannot be empty.',
    })
    .trim()
});

export default carVideoValidationSchema;
