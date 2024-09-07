import Joi from 'joi'

const carSpecificationValidationSchema = Joi.object({
   carId: Joi.number().integer().positive().required().messages({
      'any.required': 'Please provide  Car ID.',
      'number.base': 'Car ID must be a number.',
      'number.integer': 'Car ID must be an integer.',
      'number.positive': 'Car ID must be a positive number.',
   }),
   pricePerDay: Joi.number()
      .precision(2) // Ensures the value is a decimal with up to 2 decimal places
      .positive()
      .required()
      .messages({
         'any.required': ' Please provide  Price per day.',
         'number.base': 'Price per day must be a number.',
         'number.integer': 'Price per day must be an integer.',
         'number.positive': 'Price per day must be a positive number.',
      }),
   transmission: Joi.string()
      .valid('manual', 'automatic')
      .required()
      .default('manual')
      .messages({
         'any.required': 'Please provide Transmission type.',
         'string.empty': 'Transmission type cannot be empty.',
         'string.valid':
            'Transmission type must be either "manual" or "automatic".',
      }),
   fuelType: Joi.string()
      .valid('petrol', 'diesel', 'electric', 'hybrid')
      .required()
      .default('petrol')
      .messages({
         'any.required': 'Please provide Fuel type.',
         'string.empty': 'Fuel type cannot be empty.',
         'string.valid':
            'Fuel type must be one of "petrol", "diesel", "electric", or "hybrid".',
      }),
   seatingCapacity: Joi.number().integer().positive().required().messages({
      'any.required': 'Please provide Seating capacity.',
      'number.base': 'Seating capacity must be a number.',
      'number.integer': 'Seating capacity must be an integer.',
      'number.positive': 'Seating capacity must be a positive number.',
   }),
   mileage: Joi.string()
      .valid('low', 'medium', 'high')
      .required()
      .default('low')
      .messages({
         'any.required': 'Please provide Mileage.',
         'string.empty': 'Mileage cannot be empty.',
         'string.valid': 'Mileage must be one of "low", "medium", or "high".',
      }),
   engineCapacity: Joi.string().required().messages({
      'any.required': 'Please provide Engine capacity.',
      'string.empty': 'Engine capacity cannot be empty.',
   }),
   color: Joi.string().max(10).required().messages({
      'any.required': 'Please provide Color.',
      'string.empty': 'Color cannot be empty.',
      'string.max': 'Color must be up to 10 characters long.',
   }),
   enginecondition: Joi.string().required().messages({
      'any.required': 'Please provide Engine condition.',
      'string.empty': 'Engine condition cannot be empty.',
   }),
   odometerReading: Joi.number().precision(2).required().messages({
      'any.required': 'Please provide Odometer reading.',
      'number.base': 'Odometer reading must be a number.',
      'number.precision':
         'Odometer reading must have at most 2 decimal places.',
   }),
})

export default carSpecificationValidationSchema
