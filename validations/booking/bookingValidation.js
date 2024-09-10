import Joi from "joi";

export const bookingValidationSchema = Joi.object({
  customerId: Joi.number().integer().required().messages({
    "any.required": "Customer ID is required.",
    "number.base": "Customer ID must be a number.",
    "number.integer": "Customer ID must be an integer.",
  }),

  carId: Joi.number().integer().required().messages({
    "any.required": "Car ID is required.",
    "number.base": "Car ID must be a number.",
    "number.integer": "Car ID must be an integer.",
  }),

  rentalStartDate: Joi.date().required().messages({
    "any.required": "Rental start date is required.",
    "date.base": "Rental start date must be a valid date.",
  }),

  rentalEndDate: Joi.date().required().messages({
    "any.required": "Rental end date is required.",
    "date.base": "Rental end date must be a valid date.",
  }),

  initialMilesage: Joi.number().required().messages({
    "any.required": "Initial mileage is required.",
    "number.base": "Initial mileage must be a number.",
  }),
});
