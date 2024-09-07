import express from "express";
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} from "../controllers/customersController.js";
import { validateSchema } from "../middlewares/validationMiddleware.js";
import customerValidationSchema from "./../validations/customer/customerValidation.js";

import customerAddressRoutes from "./customerAddressRoutes.js";
import customerLicenseRoutes from "./customerLicenseRoutes.js";
const router = express.Router();

router.use("/address", customerAddressRoutes);
router.use("/license", customerLicenseRoutes);

router
  .route("/")
  .post(validateSchema(customerValidationSchema), createCustomer)
  .get(getCustomers);

router
  .route("/:id")
  .get(getCustomerById)
  .delete(deleteCustomerById)
  .put(updateCustomerById);

export default router;
