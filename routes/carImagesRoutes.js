import express from 'express';
import {
    createCarImages,
    getCarImages,
    getCarImagesById,
    deleteCarImagesById,
    updateCarImagesById
} from '../controllers/carImagesController.js';

const router = express.Router();

// Define routes for the /carImages endpoint
router.route('/')
    .post(createCarImages)  // Handle POST requests to create a new car image
    .get(getCarImages);     // Handle GET requests to retrieve all car images

// Define routes for the /carImages/:id endpoint
router.route('/:id')
    .get(getCarImagesById)    // Handle GET requests to retrieve a specific car image by its ID
    .delete(deleteCarImagesById) // Handle DELETE requests to remove a car image by its ID
    .put(updateCarImagesById);   // Handle PUT requests to update a car image by its ID


export default router;
