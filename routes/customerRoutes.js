import express from "express";
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} from "../controllers/customersController.js";

import {
  createCustomerLicense,
  deleteCustomerLicenseById,
  getCustomerLicenseById,
  getCustomerLicenses,
  updateCustomerLicenseById,
} from "../controllers/customerLicenseController.js";

import {
  createCustomerAddress,
  deleteCustomerAddressById,
  getCustomerAddress,
  getCustomerAddressById,
  updateCustomerAddressById,
} from "../controllers/customerAddressCcontroller.js";

const router = express.Router();

router.route("/").post(createCustomer).get(getCustomers);

router
  .route("/:id")
  .get(getCustomerById)
  .delete(deleteCustomerById)
  .put(updateCustomerById);

router.route("/").post(createCustomerLicense).get(getCustomerLicenses);

router
  .route("/:id")
  .get(getCustomerLicenseById)
  .delete(deleteCustomerLicenseById)
  .put(updateCustomerLicenseById);

router.route("/").post(createCustomerAddress).get(getCustomerAddress);
router
  .route("/:id")
  .get(getCustomerAddressById)
  .delete(deleteCustomerAddressById)
  .put(updateCustomerAddressById);

export default router;
