import express from 'express'
import {
   createCarMedia,
   getCarMedia,
   getCarMediaById,
   deleteCarMediaById,
   updateCarMediaByCarId,
   getCarMediaByCarId,
   deleteCarMediaByCarId
} from '../../controllers/car/carsMediaController.js'

import carsMediaValidationSchema from '../../validations/car/carsMediaValidation.js' 
import { validateSchema } from '../../middlewares/validationMiddleware.js'
const router = express.Router()

// Define routes for the /media endpoint
router
   .route('/')
   .post(validateSchema(carsMediaValidationSchema), createCarMedia) 
   .get(getCarMedia) 


router.route ("/car/:carId").get(getCarMediaByCarId).delete(deleteCarMediaByCarId).put(updateCarMediaByCarId);

// Define routes for the /media/:id endpoint
router
   .route('/:id')
   .get(getCarMediaById) 
   .delete(deleteCarMediaById) 

export default router
