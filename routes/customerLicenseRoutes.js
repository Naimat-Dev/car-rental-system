import express from "express";
import {
  createCustomerLicense,
  deleteCustomerLicenseById,
  getCustomerLicenseById,
  getCustomerLicenses,
  updateCustomerLicenseById,
} from "../controllers/customerLicenseController.js";

const router = express.Router();

router.route("/").post(createCustomerLicense).get(getCustomerLicenses);

router
  .route("/:id")
  .get(getCustomerLicenseById)
  .delete(deleteCustomerLicenseById)
  .put(updateCustomerLicenseById);

export default router;
