import Joi from 'joi';

const userValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      'any.required': 'Please provide name.',
      'string.empty': 'Name cannot be empty.',
    })
    .trim(),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Please provide email address.',
      'string.email': 'Please provide a valid email address.',
    })
    .lowercase()
    .trim(),

  phoneNumber: Joi.string()
    .max(30)  // Length based on schema
    .required()
    .messages({
      'any.required': 'Please provide phone number.',
      'string.length': 'Phone number must be exactly 30 characters long.',
      'string.empty': 'Phone number cannot be empty.',
    })
    .trim(),

  registrationDate: Joi.date()
    .required()
    .messages({
      'any.required': 'Please provide registration date.',
      'date.base': 'Registration date must be a valid date.',
    }),

  image: Joi.string()
    .optional()
    .allow('', null),  // Allow empty string and null

  cnic: Joi.string()
    .max(20)
    .optional()
    .messages({
      'string.length': 'CNIC must be exactly 20 characters long.',
    })
    .trim(),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'any.required': 'Please provide a password.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.empty': 'Password cannot be empty.',
    }),

  role: Joi.string()
    .valid('admin', 'user')  // Validate against allowed values
    .default('user')  // Default value if not provided
    .messages({
      'any.required': 'Please provide a role.',
      'string.valid': 'Role must be either "admin" or "user".',
    }),

});

export default userValidationSchema;
