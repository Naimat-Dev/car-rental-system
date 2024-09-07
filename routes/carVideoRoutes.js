import express from 'express';
import {
  createCarVideo,
  getCarVideos,
  getCarVideoById,
  updateCarVideoById,
  deleteCarVideoById
} from '../controllers/carVideoController.js';

const router = express.Router();


// Define routes for the /carVideos endpoint
router.route('/')
    .post(createCarVideo)  // Handle POST requests to create a new car video
    .get(getCarVideos);    // Handle GET requests to retrieve all car videos

// Define routes for the /carVideos/:id endpoint
router.route('/:id')
    .get(getCarVideoById)  // Handle GET requests to retrieve a specific car video by its ID
    .put(updateCarVideoById) // Handle PUT requests to update a car video by its ID
    .delete(deleteCarVideoById); // Handle DELETE requests to remove a car video by its ID


export default router;