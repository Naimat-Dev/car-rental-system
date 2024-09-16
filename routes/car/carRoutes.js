import express from "express";
import {
  createCar,
  deleteCarById,
  getCarById,
  updateCarById,
  getCars,
  getCarDetailsWithJoinById,
  getCarsDetailsWithJoin,
} from "../../controllers/car/carController.js";
import { validateSchema } from "../../middlewares/validationMiddleware.js";
import carValidationSchema from "../../validations/car/carValidation.js";

import brandRoutes from './brandRoutes.js'
import carSpecificationRoutes from './carSpecificationRoutes.js'
import carStatusRoutes from './carStatusRoutes.js'
import carsMediaRoutes from './carsMediaRoutes.js'
import carTypesRoutes from './carTypeRoutes.js'
import carConditionRoutes from './carConditionRoutes.js'

const router = express.Router();

router.use("/condition", carConditionRoutes);
router.use("/brands", brandRoutes);

router.use("/types", carTypesRoutes);

router.use("/specifications", carSpecificationRoutes);

router.use("/status", carStatusRoutes);

router.use('/media', carsMediaRoutes)

router.use('/conditions', carConditionRoutes)

// Define routes for the /cars endpoint
router
   .route('/')
   .post(validateSchema(carValidationSchema), createCar)
   .get(getCars)

router.get("/all", getCarsDetailsWithJoin);
router.get("/all/:id", getCarDetailsWithJoinById);

// Define routes for the /cars endpoint
router
   .route('/')
   .post(validateSchema(carValidationSchema), createCar)
   .get(getCars)

// Define routes for the /cars/:id endpoint
router.route('/:id').get(getCarById).put(updateCarById).delete(deleteCarById)

export default router;
