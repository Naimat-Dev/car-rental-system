import Joi from 'joi';

const carsMediaValidationSchema = Joi.object({
  carId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'Please provide a valid car ID.',
      'number.base': 'Car ID must be a number.',
      'number.positive': 'Car ID must be a positive integer.',
    }),

  imageUrls: Joi.array()
    .items(Joi.string().uri())
    .default([])
    .messages({
      'array.base': 'Image URLs must be an array of valid URIs.',
      'string.uri': 'Each image URL must be a valid URI.',
    }),

  videoUrls: Joi.array()
    .items(Joi.string().uri())
    .default([])
    .messages({
      'array.base': 'Video URLs must be an array of valid URIs.',
      'string.uri': 'Each video URL must be a valid URI.',
    })
});

export default carsMediaValidationSchema;
