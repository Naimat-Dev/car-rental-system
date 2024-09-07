import Joi from 'joi';

const carTypeValidationSchema = Joi.object({
  carType: Joi.string()
    .max(30)
    .required()
    .messages({
      'any.required': 'Please provide Car type is required.',
      'string.max': 'Car type cannot exceed 30 characters.',
      'string.empty': 'Car type cannot be empty.',
    })
    .trim()
});

export default carTypeValidationSchema;
