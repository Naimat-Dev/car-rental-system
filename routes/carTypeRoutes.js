import express from 'express';
import {
  createCarType,
  getCarTypes,
  getCarTypeById,
  updateCarTypeById,
  deleteCarTypeById
} from '../controllers/carTypeController.js';

const router = express.Router();

// Define routes for the /carTypes endpoint
router.route('/')
    .post(createCarType)  // Handle POST requests to create a new car type
    .get(getCarTypes);    // Handle GET requests to retrieve all car types

// Define routes for the /carTypes/:id endpoint
router.route('/:id')
    .get(getCarTypeById)  // Handle GET requests to retrieve a specific car type by its ID
    .put(updateCarTypeById) // Handle PUT requests to update a car type by its ID
    .delete(deleteCarTypeById); // Handle DELETE requests to remove a car type by its ID


export default router;