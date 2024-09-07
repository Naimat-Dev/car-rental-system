import Joi from 'joi';

const carSpecificationValidationSchema = Joi.object({
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
  pricePerDay: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Price per day is required.',
      'number.base': 'Price per day must be a number.',
      'number.integer': 'Price per day must be an integer.',
      'number.positive': 'Price per day must be a positive number.',
    }),
  transmission: Joi.string()
    .valid('manual', 'automatic')
    .required()
    .default('manual')
    .messages({
      'any.required': 'Transmission type is required.',
      'string.empty': 'Transmission type cannot be empty.',
      'string.valid': 'Transmission type must be either "manual" or "automatic".',
    }),
  fuelType: Joi.string()
    .valid('petrol', 'diesel', 'electric', 'hybrid')
    .required()
    .default('petrol')
    .messages({
      'any.required': 'Fuel type is required.',
      'string.empty': 'Fuel type cannot be empty.',
      'string.valid': 'Fuel type must be one of "petrol", "diesel", "electric", or "hybrid".',
    }),
  seatingCapacity: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Seating capacity is required.',
      'number.base': 'Seating capacity must be a number.',
      'number.integer': 'Seating capacity must be an integer.',
      'number.positive': 'Seating capacity must be a positive number.',
    }),
  mileage: Joi.string()
    .valid('low', 'medium', 'high')
    .required()
    .default('low')
    .messages({
      'any.required': 'Mileage is required.',
      'string.empty': 'Mileage cannot be empty.',
      'string.valid': 'Mileage must be one of "low", "medium", or "high".',
    }),
  engineCapacity: Joi.string()
    .required()
    .messages({
      'any.required': 'Engine capacity is required.',
      'string.empty': 'Engine capacity cannot be empty.',
    }),
  color: Joi.string()
    .max(10)
    .required()
    .messages({
      'any.required': 'Color is required.',
      'string.empty': 'Color cannot be empty.',
      'string.max': 'Color must be up to 10 characters long.',
    }),
  enginecondition: Joi.string()
    .required()
    .messages({
      'any.required': 'Engine condition is required.',
      'string.empty': 'Engine condition cannot be empty.',
    }),
  odometerReading: Joi.number()
    .precision(2)
    .required()
    .messages({
      'any.required': 'Odometer reading is required.',
      'number.base': 'Odometer reading must be a number.',
      'number.precision': 'Odometer reading must have at most 2 decimal places.',
    }),
});

export default carSpecificationValidationSchema;
