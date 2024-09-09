import Joi from 'joi';

const carValidationSchema = Joi.object({
  name: Joi.string()
    .max(10)
    .required()
    .messages({
      'any.required': 'Please provide Car name.',
      'string.max': 'Car name cannot exceed 10 characters.',
      'string.empty': 'Car name cannot be empty.',
    })
    .trim(),

  brandId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide Brand ID.',
      'number.base': 'Brand ID must be a number.',
      'number.integer': 'Brand ID must be an integer.',
      'number.positive': 'Brand ID must be a positive number.',
    }),

  model: Joi.number()
    .integer()
    .min(1886)
    .max(new Date().getFullYear() + 1) // Car model should be realistic
    .required()
    .messages({
      'any.required': 'Please provide Model year.',
      'number.base': 'Model year must be a number.',
      'number.integer': 'Model year must be an integer.',
      'number.min': 'Model year must be later than 1886.',
      'number.max': `Model year cannot be later than next year.`,
    }),

  cartypeId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide Car Type ID.',
      'number.base': 'Car Type ID must be a number.',
      'number.integer': 'Car Type ID must be an integer.',
      'number.positive': 'Car Type ID must be a positive number.',
    }),

  registrationcity: Joi.string()
    .max(30)
    .required()
    .messages({
      'any.required': 'Please provide Registration city.',
      'string.max': 'Registration city cannot exceed 30 characters.',
      'string.empty': 'Registration city cannot be empty.',
    })
    .trim(),

  registrationNumber: Joi.string()
    .max(20)
    .required()
    .messages({
      'any.required': 'Please provide Registration number.',
      'string.max': 'Registration number cannot exceed 20 characters.',
      'string.empty': 'Registration number cannot be empty.',
    })
    .trim(),

  description: Joi.string()
    .max(255)
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 255 characters.',
    }),

  carDocuments: Joi.string()
    .valid('registration', 'unregistered')
    .required()
    .messages({
      'any.required': 'Please provide Car document status.',
      'any.only': 'Car document must be either "registration" or "unregistered".',
    }),

  assembly: Joi.string()
    .valid('imported', 'local')
    .required()
    .messages({
      'any.required': 'Please provide Assembly status.',
      'any.only': 'Assembly must be either "imported" or "local".',
    }),
});

export default carValidationSchema;
