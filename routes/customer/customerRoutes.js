import express from "express";
import {
  createCustomer,
  deleteCustomerById,
  getAllCustomersJoin,
  getCustomerById,
  getCustomers,
  getCustomersJoinById,
  updateCustomerById,
} from "../../controllers/customer/customersController.js";
// import { validateSchema } from "../../middlewares/validationMiddleware.js";
import customerValidationSchema from "../../validations/customer/customerValidation.js";
import { validateSchema } from "../../middlewares/validationMiddleware.js";

import customerAddressRoutes from "./customerAddressRoutes.js";
import customerLicenseRoutes from "./customerLicenseRoutes.js";

const router = express.Router();

router.use("/address", customerAddressRoutes);
router.use("/license", customerLicenseRoutes);

router.get("/all/:id", getCustomersJoinById);
router.get("/all", getAllCustomersJoin);

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
