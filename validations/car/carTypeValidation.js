import Joi from 'joi';

const carTypeValidationSchema = Joi.object({
  carType: Joi.string()
    .max(30)  // Max length of 30 characters
    .required()  // carType is required
    .messages({
      'any.required': 'Please provide the car type.',
      'string.max': 'Car type cannot exceed 30 characters.',
      'string.empty': 'Car type cannot be empty.',
    })
    .trim()  // Trims leading and trailing whitespace
});

export default carTypeValidationSchema;
