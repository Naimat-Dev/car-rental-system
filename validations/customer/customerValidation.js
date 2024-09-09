import Joi from "joi";

const customerValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(50)
    .required()
    .messages({
      "any.required": "First name is required.",
      "string.empty": "First name cannot be empty.",
      "string.max": "First name cannot exceed 50 characters.",
    })
    .trim(),

  lastName: Joi.string()
    .max(50)
    .required()
    .messages({
      "any.required": "Last name is required.",
      "string.empty": "Last name cannot be empty.",
      "string.max": "Last name cannot exceed 50 characters.",
    })
    .trim(),

  password: Joi.string().min(8).max(128).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 8 characters long.",
    "string.max": "Password cannot exceed 128 characters.",
  }),

  cnic: Joi.string().max(20).required().messages({
    "any.required": "CNIC is required.",
    "string.empty": "CNIC cannot be empty.",
    "string.length": "CNIC must be exactly 20 characters.",
  }),

  phoneNumber: Joi.string().max(20).required().messages({
    "any.required": "Phone number is required.",
    "string.empty": "Phone number cannot be empty.",
    "string.length": "Phone number must be exactly 20 characters.",
  }),

  dateOfBirth: Joi.date().required().messages({
    "any.required": "Date of birth is required.",
    "date.base": "Please provide a valid date of birth.",
  }),

  imageUrl: Joi.string().uri().required().messages({
    "any.required": "Image URL is required.",
    "string.empty": "Image URL cannot be empty.",
    "string.uri": "Please provide a valid image URL.",
  }),

  status: Joi.string().valid("active", "inactive").required().messages({
    "any.required": "Status is required.",
    "any.only": 'Status must be either "active" or "inactive".',
  }),
});

export default customerValidationSchema;
