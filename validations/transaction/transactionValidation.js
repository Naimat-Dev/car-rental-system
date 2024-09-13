import Joi from 'joi'

export const transactionValidationSchema = Joi.object({
   customerId: Joi.number().integer().required().messages({
      'any.required': 'Customer ID is required.',
      'number.base': 'Customer ID must be a number.',
      'number.integer': 'Customer ID must be an integer.',
   }),

   bookingId: Joi.number().integer().required().messages({
      'any.required': 'Booking ID is required.',
      'number.base': 'Booking ID must be a number.',
      'number.integer': 'Booking ID must be an integer.',
   }),

   ownerId: Joi.number().integer().required().messages({
      'any.required': 'Owner ID is required.',
      'number.base': 'Owner ID must be a number.',
      'number.integer': 'Owner ID must be an integer.',
   }),

   additionalCharges: Joi.number().min(0).default(0).messages({
      'number.base': 'Additional charges must be a number.',
      'number.min': 'Additional charges cannot be less than 0.',
   }),

   rentalCharges: Joi.number().min(0).default(0).messages({
      'number.base': 'Rental charges must be a number.',
      'number.min': 'Rental charges cannot be less than 0.',
   }),

   paymentMethod: Joi.string()
      .valid('creditCard', 'debitCard')
      .required()
      .messages({
         'any.required': 'Payment method is required.',
         'string.base': 'Payment method must be a string.',
         'string.valid':
            'Payment method must be either "cridetCard" or "debitCard".',
      }),

   paymentDate: Joi.date().required().messages({
      'any.required': 'Payment date is required.',
      'date.base': 'Payment date must be a valid date.',
   }),
})
