import Joi from 'joi';

const customerLicenseValidationSchema = Joi.object({
  customerId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Customer ID is required.',
      'number.base': 'Customer ID must be a number.',
      'number.integer': 'Customer ID must be an integer.',
      'number.positive': 'Customer ID must be a positive number.',
    }),

  drivingLicenseNumber: Joi.string()
    .max(30)
    .required()
    .messages({
      'any.required': 'Driving license number is required.',
      'string.empty': 'Driving license number cannot be empty.',
      'string.max': 'Driving license number cannot exceed 30 characters.',
    })
    .trim(),

  licenseExpiryDate: Joi.date()
    .required()
    .messages({
      'any.required': 'License expiry date is required.',
      'date.base': 'License expiry date must be a valid date.'
    }),
});

export default customerLicenseValidationSchema;
