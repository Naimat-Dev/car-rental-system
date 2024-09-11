import Joi from 'joi'

const carConditionValidationSchema = Joi.object({
   carId: Joi.number().integer().required().messages({
      'any.required': 'Car ID is required.',
      'number.base': 'Car ID must be a number.',
      'number.integer': 'Car ID must be an integer.',
   }),

   conditionType: Joi.string()
      .valid('initial', 'final')
      .default('initial')
      .messages({
         'any.required': 'Condition type is required.',
         'string.base': 'Condition type must be a string.',
         'string.valid': 'Condition type must be either "initial" or "final".',
      }),

   imageUrls: Joi.array().items(Joi.string().uri()).default([]).messages({
      'array.base': 'Image URLs must be an array.',
      'string.uri': 'Each image URL must be a valid URI.',
   }),

   videoUrls: Joi.array().items(Joi.string().uri()).default([]).messages({
      'array.base': 'Video URLs must be an array.',
      'string.uri': 'Each video URL must be a valid URI.',
   }),

   timestamps: Joi.date()
      .default(() => new Date(), 'current date')
      .messages({
         'date.base': 'Timestamps must be a valid date.',
      }),
})

export default carConditionValidationSchema
