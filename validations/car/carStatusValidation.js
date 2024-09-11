import Joi from 'joi';

const carStatusValidationSchema = Joi.object({
  
  carId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide a valid car ID.',
      'number.base': 'Car ID must be a number.',
      'number.positive': 'Car ID must be a positive integer.',
    }),

  location: Joi.string()
    .max(255)
    .required()
    .messages({
      'any.required': 'Please provide the location of the car.',
      'string.max': 'Location cannot exceed 255 characters.',
      'string.empty': 'Location cannot be empty.',
    }),

  availabilityStatus: Joi.string()
    .valid('available', 'unavailable', 'maintenance')
    .default('available')
    .required()
    .messages({
      'any.only': 'Availability status must be one of "available", "unavailable", or "maintenance".',
    }),

  insuranceDetail: Joi.string()
    .max(255)
    .allow(null, '')
    .messages({
      'string.max': 'Insurance details cannot exceed 255 characters.',
    }),

  fuelPolicy: Joi.string()
    .valid('full-to-full', 'same-to-same')
    .default('full-to-full')
    .required()
    .messages({
      'any.only': 'Fuel policy must be either "full-to-full" or "same-to-same".',
    }),

  lastServicedDate: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Please provide the last serviced date.',
      'string.max': 'Last serviced date cannot exceed 50 characters.',
      'string.empty': 'Last serviced date cannot be empty.',
    })
});

export default carStatusValidationSchema;
