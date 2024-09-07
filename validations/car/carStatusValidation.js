import Joi from 'joi';

const carStatusValidationSchema = Joi.object({
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
  location: Joi.string()
    .max(255)
    .required()
    .messages({
      'any.required': 'Location is required.',
      'string.empty': 'Location cannot be empty.',
      'string.max': 'Location must be at most 255 characters long.',
    }),
  availabilityStatus: Joi.string()
    .valid('available', 'unavailable', 'maintenance')
    .required()
    .default('available')
    .messages({
      'any.required': 'Availability status is required.',
      'string.empty': 'Availability status cannot be empty.',
      'string.valid': 'Availability status must be one of "available", "unavailable", or "maintenance".',
    }),
  insuranceDetail: Joi.string()
    .max(255)
    .optional()
    .messages({
      'string.max': 'Insurance detail must be at most 255 characters long.',
    }),
  fuelPolicy: Joi.string()
    .valid('full-to-full', 'same-to-same')
    .required()
    .default('full-to-full')
    .messages({
      'any.required': 'Fuel policy is required.',
      'string.empty': 'Fuel policy cannot be empty.',
      'string.valid': 'Fuel policy must be one of "full-to-full" or "same-to-same".',
    }),
  lastServicedDate: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Last serviced date is required.',
      'string.empty': 'Last serviced date cannot be empty.',
      'string.max': 'Last serviced date must be at most 50 characters long.',
    }),
});

export default carStatusValidationSchema;
