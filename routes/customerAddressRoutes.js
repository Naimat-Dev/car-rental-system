import express from "express";
import {
  createCustomerAddress,
  deleteCustomerAddressById,
  getCustomerAddress,
  getCustomerAddressById,
  updateCustomerAddressById,
} from "../controllers/customerAddressCcontroller.js";

const router = express.Router();

router.route("/").post(createCustomerAddress).get(getCustomerAddress);

router
  .route("/:id")
  .get(getCustomerAddressById)
  .delete(deleteCustomerAddressById)
  .put(updateCustomerAddressById);

export default router;
