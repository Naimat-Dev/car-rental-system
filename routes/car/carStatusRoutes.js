import express from 'express';
import {
    createCarStatus,
    getCarStatus,
    getCarStatusById,
    deleteCarStatusById,
    updateCarStatusById
} from '../controllers/cars/carStatusController.js';
import { validateSchema } from '../middlewares/validationMiddleware.js';
import carStatusValidationSchema from '../validations/car/carStatusValidation.js';
const router = express.Router();


// Define routes for the /carStatuses endpoint
router.route('/')
    .post(validateSchema(carStatusValidationSchema),createCarStatus)  // Handle POST requests to create a new car status
    .get(getCarStatus);     // Handle GET requests to retrieve all car statuses

// Define routes for the /carStatuses/:id endpoint
router.route('/:id')
    .get(getCarStatusById)  // Handle GET requests to retrieve a specific car status by its ID
    .put(updateCarStatusById) // Handle PUT requests to update a car status by its ID
    .delete(deleteCarStatusById); // Handle DELETE requests to remove a car status by its ID

export default router;
