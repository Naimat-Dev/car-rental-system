import Joi from 'joi';

const carValidationSchema = Joi.object({
  name: Joi.string()
    .max(10)  // Name must be a string with a max length of 10 characters
    .required()
    .messages({
      'any.required': 'Please provide the car name.',
      'string.max': 'Car name cannot exceed 10 characters.',
      'string.empty': 'Car name cannot be empty.',
    })
    .trim(),

  brandId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide a valid brand ID.',
      'number.base': 'Brand ID must be a number.',
      'number.positive': 'Brand ID must be a positive integer.',
    }),

  model: Joi.number()
    .required()
    .messages({
      'any.required': 'Please provide the model year.',
      'number.base': 'Model must be a number.',
    }),

  carTypeId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide a valid car type ID.',
      'number.base': 'Car Type ID must be a number.',
      'number.positive': 'Car Type ID must be a positive integer.',
    }),

  registrationCity: Joi.string()
    .max(30)
    .required()
    .messages({
      'any.required': 'Please provide the registration city.',
      'string.max': 'Registration city cannot exceed 30 characters.',
      'string.empty': 'Registration city cannot be empty.',
    })
    .trim(),

  registrationNumber: Joi.string()
    .max(20)
    .required()
    .messages({
      'any.required': 'Please provide the registration number.',
      'string.max': 'Registration number cannot exceed 20 characters.',
      'string.empty': 'Registration number cannot be empty.',
    })
    .trim(),

  description: Joi.string()
    .max(255)
    .allow(null, '')  // Description is optional, can be null or empty
    .messages({
      'string.max': 'Description cannot exceed 255 characters.',
    }),

  carDocuments: Joi.string()
    .valid('registration', 'unRegistered')
    .default('registration')
    .required()
    .messages({
      'any.only': 'Car documents must be either "registration" or "unRegistered".',
    }),

  assembly: Joi.string()
    .valid('imported', 'local')
    .default('local')
    .required()
    .messages({
      'any.only': 'Assembly must be either "imported" or "local".',
    })
});

export default carValidationSchema;
