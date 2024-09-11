import express from 'express'
import {
   createCarSpecification,
   getCarSpecifications,
   getCarSpecificationById,
   updateCarSpecificationById,
   deleteCarSpecificationById,
   getCarSpecificationByCarId,
   updateCarSpecificationByCarId,
   deleteCarSpecificationByCarId,
} from './../../controllers/car/carSpecificationController.js'

import { validateSchema } from './../../middlewares/validationMiddleware.js'
import carSpecificationValidationSchema from './../../validations/car/carSpecificationValidation.js'

const router = express.Router()

// Define routes for the /specifications endpoint
router
   .route('/')
   .post(
      validateSchema(carSpecificationValidationSchema),
      createCarSpecification
   )
   .get(getCarSpecifications)

// Define routes for the /specifications/car/:carId endpoint
router
   .route('/car/:carId')
   .get(getCarSpecificationByCarId)
   .put(updateCarSpecificationByCarId)
   .delete(deleteCarSpecificationByCarId)
   
// Define routes for the /specifications/:id endpoint
router
   .route('/:id')
   .get(getCarSpecificationById) 
   .put(updateCarSpecificationById) 
   .delete(deleteCarSpecificationById) 

export default router
