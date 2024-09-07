import Joi from 'joi';

const userAddressValidationSchema = Joi.object({
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': 'Please provide User ID.',
      'number.base': 'User ID must be a number.',
      'number.integer': 'User ID must be an integer.',
    }),

  address: Joi.string()
    .max(255)
    .required()
    .messages({
      'any.required': 'Please provide Address.',
      'string.base': 'Address must be a string.',
      'string.max': 'Address cannot be longer than 255 characters.',
      'string.empty': 'Address cannot be empty.',
    })
    .trim(),

  city: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Please provide City.',
      'string.base': 'City must be a string.',
      'string.max': 'City cannot be longer than 50 characters.',
      'string.empty': 'City cannot be empty.',
    })
    .trim(),

  zipCode: Joi.string()
    .max(10)
    .required()
    .messages({
      'any.required': 'Please provide Zip-Code.',
      'string.base': 'Zip code must be a string.',
      'string.max': 'Zip code cannot be longer than 10 characters.',
      'string.empty': 'Zip code cannot be empty.',
    })
    .trim(),

  state: Joi.string()
    .max(50)
    .required()
    .messages({
      'any.required': 'Please provide Sate.',
      'string.base': 'State must be a string.',
      'string.max': 'State cannot be longer than 50 characters.',
      'string.empty': 'State cannot be empty.',
    })
    .trim(),
});

export default userAddressValidationSchema;
