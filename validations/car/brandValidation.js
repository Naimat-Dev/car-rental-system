import Joi from 'joi';

const brandValidationSchema = Joi.object({
  name: Joi.string()
    .max(30)  // Max length of 30 characters
    .required()  // Name is required
    .messages({
      'any.required': 'Please provide Brand name.',
      'string.max': 'Brand name cannot exceed 30 characters.',
      'string.empty': 'Brand name cannot be empty.',  // Handles empty strings
    })
    .trim() 
});

export default brandValidationSchema;
