import express from "express";

import { validateSchema } from "../../middlewares/validationMiddleware.js";

import { transactionValidationSchema } from "./../../validations/transaction/transactionValidation.js";

import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactions,
  joinAllTransactionsDetails,
  joinTransactionDetailsById,
  updateTransactionById,
} from "../../controllers/transaction/transactionController.js";
import { joinAllCustomersDetails } from "../../controllers/customer/customersController.js";

const router = express.Router();


router.get('/all', joinAllTransactionsDetails)
router.get('/all/:id', joinTransactionDetailsById)


router
  .route("/")
  .post(validateSchema(transactionValidationSchema), createTransaction)
  .get(getTransactions);


router
  .route("/:id")
  .get(getTransactionById)
  .delete(deleteTransactionById)
  .put(updateTransactionById);

export default router;
