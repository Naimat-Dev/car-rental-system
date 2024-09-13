import express from "express";

import { validateSchema } from "../../middlewares/validationMiddleware.js";
import carConditionValidationSchema from "../../validations/car/carConditionValiation.js"
import { createCarCondition, deleteCarConditionById, getCarConditions, getCarConditionById, updateCarConditionById } from "../../controllers/car/carConditionController.js";


const router = express.Router();

router
  .route("/")
  .post(validateSchema(carConditionValidationSchema), createCarCondition)
  .get(getCarConditions);

router
  .route("/:id")
  .get(getCarConditionById)
  .put(updateCarConditionById)
  .delete(deleteCarConditionById);

export default router;
