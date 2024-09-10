import express from 'express'
import {
   createCarMedia,
   getCarMedia,
   getCarMediaById,
   deleteCarMediaById,
   updateCarMediaById,
} from '../../controllers/car/carsMediaController.js'

import carsMediaValidationSchema from '../../validations/car/carsMediaValidation.js' // Assuming validation schema exists
import { validateSchema } from '../../middlewares/validationMiddleware.js'
const router = express.Router()

// Define routes for the /carsMedia endpoint
router
   .route('/')
   .post(validateSchema(carsMediaValidationSchema), createCarMedia) // Handle POST requests to create new car media
   .get(getCarMedia) // Handle GET requests to retrieve all car media

// Define routes for the /carsMedia/:id endpoint
router
   .route('/:id')
   .get(getCarMediaById) // Handle GET requests to retrieve a specific car media entry by its ID
   .delete(deleteCarMediaById) // Handle DELETE requests to remove a car media entry by its ID
   .put(updateCarMediaById) // Handle PUT requests to update a car media entry by its ID and carId
export default router
