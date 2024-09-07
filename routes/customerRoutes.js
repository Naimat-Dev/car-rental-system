import express from "express";
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomers,
  updateCustomerById,
} from "../controllers/customersController.js";

const router = express.Router();

router.route("/").post(createCustomer).get(getCustomers);

router
  .route("/:id")
  .get(getCustomerById)
  .delete(deleteCustomerById)
  .put(updateCustomerById);

export default router;
