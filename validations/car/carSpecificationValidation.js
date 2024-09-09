import Joi from 'joi';

const carSpecificationsValidationSchema = Joi.object({
  carId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide a valid car ID.',
      'number.base': 'Car ID must be a number.',
      'number.positive': 'Car ID must be a positive integer.',
    }),

  pricePerDay: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide the price per day.',
      'number.base': 'Price per day must be a number.',
      'number.positive': 'Price per day must be a positive value.',
    }),

  transmission: Joi.string()
    .valid('manual', 'automatic')
    .default('manual')
    .required()
    .messages({
      'any.only': 'Transmission must be either "manual" or "automatic".',
    }),

  fuelType: Joi.string()
    .valid('petrol', 'diesel', 'electric', 'hybrid')
    .default('petrol')
    .required()
    .messages({
      'any.only': 'Fuel type must be one of "petrol", "diesel", "electric", or "hybrid".',
    }),

  seatingCapacity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide the seating capacity.',
      'number.base': 'Seating capacity must be a number.',
      'number.positive': 'Seating capacity must be a positive integer.',
    }),

  minMileage: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide the minimum mileage.',
      'number.base': 'Minimum mileage must be a number.',
      'number.positive': 'Minimum mileage must be a positive value.',
      'number.precision': 'Minimum mileage must have up to 2 decimal places.',
    }),

  maxMileage: Joi.number()
    .precision(2)
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide the maximum mileage.',
      'number.base': 'Maximum mileage must be a number.',
      'number.positive': 'Maximum mileage must be a positive value.',
      'number.precision': 'Maximum mileage must have up to 2 decimal places.',
    }),

  engineCapacity: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide the engine capacity.',
      'string.empty': 'Engine capacity cannot be empty.',
    }),

  color: Joi.string()
    .max(10)
    .required()
    .messages({
      'any.required': 'Please provide the car color.',
      'string.max': 'Car color cannot exceed 10 characters.',
      'string.empty': 'Car color cannot be empty.',
    }),

  engineCondition: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide the engine condition.',
      'string.empty': 'Engine condition cannot be empty.',
    }),

  odometerReading: Joi.number()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide the odometer reading.',
      'number.base': 'Odometer reading must be a number.',
      'number.positive': 'Odometer reading must be a positive value.',
    })
});

export default carSpecificationsValidationSchema;
