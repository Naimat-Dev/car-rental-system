import express from "express";

import { validateSchema } from "../../middlewares/validationMiddleware.js";

import { transactionValidationSchema } from "./../../validations/transaction/transactionValidation.js";

import {
  createTransaction,
  deleteTransactionById,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "../../controllers/transaction/transactionController.js";

const router = express.Router();

router
  .route("/")
  .post(validateSchema(transactionValidationSchema), createTransaction)
  .get(getTransactions);

router
  .route("/:id")
  .get(getTransactionById)
  .delete(deleteTransactionById)
  .put(updateTransaction);

export default router;
