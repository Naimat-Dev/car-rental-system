import Joi from 'joi';

const carImageValidationSchema = Joi.object({
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
  imageUrl: Joi.string()
    .max(255)
    .required()
    .messages({
      'any.required': 'Image URL is required.',
      'string.empty': 'Image URL cannot be empty.',
      'string.max': 'Image URL must be at most 255 characters long.',
    }),
  isPrimary: Joi.boolean()
    .default(false)
    .messages({
      'boolean.base': 'IsPrimary must be a boolean.',
    }),
});

export default carImageValidationSchema;
