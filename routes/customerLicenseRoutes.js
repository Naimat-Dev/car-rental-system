import express from "express";
import {
  createCustomerLicense,
  deleteCustomerLicenseById,
  getCustomerLicenseById,
  getCustomerLicenses,
  updateCustomerLicenseById,
} from "../controllers/customerLicenseController.js";
import { validateSchema } from "../middlewares/validationMiddleware.js";
import customerLicenseValidationSchema from './../validations/customer/customerLicenseValidation.js';

const router = express.Router();

router.route("/").post(validateSchema(customerLicenseValidationSchema) , createCustomerLicense).get(getCustomerLicenses);

router
  .route("/:id")
  .get(getCustomerLicenseById)
  .delete(deleteCustomerLicenseById)
  .put(updateCustomerLicenseById);

export default router;
