import Joi from "joi";

const customerAddressValidationSchema = Joi.object({
  customerId: Joi.number().integer().positive().required().messages({
    "any.required": "Customer ID is required.",
    "number.base": "Customer ID must be a number.",
    "number.integer": "Customer ID must be an integer.",
    "number.positive": "Customer ID must be a positive number.",
  }),

  address: Joi.string()
    .max(255)
    .required()
    .messages({
      "any.required": "Address is required.",
      "string.empty": "Address cannot be empty.",
      "string.max": "Address cannot exceed 255 characters.",
    })
    .trim(),

  city: Joi.string()
    .max(50)
    .required()
    .messages({
      "any.required": "City is required.",
      "string.empty": "City cannot be empty.",
      "string.max": "City cannot exceed 50 characters.",
    })
    .trim(),

  state: Joi.string()
    .max(20)
    .required()
    .messages({
      "any.required": "State is required.",
      "string.empty": "State cannot be empty.",
      "string.max": "State cannot exceed 20 characters.",
    })
    .trim(),

  zipCode: Joi.string()
    .max(10)
    .required()
    .messages({
      "any.required": "Zip code is required.",
      "string.empty": "Zip code cannot be empty.",
      "string.max": "Zip code cannot exceed 10 characters.",
    })
    .trim(),

  country: Joi.string()
    .max(30)
    .required()
    .messages({
      "any.required": "Country is required.",
      "string.empty": "Country cannot be empty.",
      "string.max": "Country cannot exceed 30 characters.",
    })
    .trim(),
});

export default customerAddressValidationSchema;
