import express from 'express';
import {
  createCarSpecification,
  getCarSpecifications,
  getCarSpecificationById,
  updateCarSpecificationById,
  deleteCarSpecificationById
} from '../controllers/cars/carSpecificationController.js';
import { validateSchema } from '../middlewares/validationMiddleware.js';
import carSpecificationValidationSchema from '../validations/car/carSpecificationValidation.js';
const router = express.Router();

// Define routes for the /cars/specifications endpoint
router.route('/')
    .post(validateSchema(carSpecificationValidationSchema),createCarSpecification)  // Handle POST requests to create a new car specification
    .get(getCarSpecifications);    // Handle GET requests to retrieve all car specifications

// Define routes for the /carSpecifications/:id endpoint
router.route('/:id')
    .get(getCarSpecificationById)  // Handle GET requests to retrieve a specific car specification by its ID
    .put(updateCarSpecificationById) // Handle PUT requests to update a car specification by its ID
    .delete(deleteCarSpecificationById); // Handle DELETE requests to remove a car specification by its ID

router.route("/")
export default router;