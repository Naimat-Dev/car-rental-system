import express from "express";
import {createCar,deleteCarById,getCarbyId,updateCarById,getCars} from "../controllers/carHandler.js"; 
const router = express.Router();


// Define routes for the /cars endpoint
router.route('/')
    .post(createCar)  // Handle POST requests to create a new car
    .get(getCars);    // Handle GET requests to retrieve all cars

// Define routes for the /cars/:id endpoint
router.route('/:id')
    .get(getCarbyId)      // Handle GET requests to retrieve a specific car by its ID
    .put(updateCarById)   // Handle PUT requests to update a car by its ID
    .delete(deleteCarById); // Handle DELETE requests to remove a car by its ID


export default router;
