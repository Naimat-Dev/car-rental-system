import express from 'express'
import {
   createCarStatus,
   getCarStatus,
   getCarStatusById,
   deleteCarStatusById,
   updateCarStatusById,
   getCarStatusByCarId,
   updateCarStatusByCarId,
   deleteCarStatusByCarId,
} from '../../controllers/car/carStatusController.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import carStatusValidationSchema from '../../validations/car/carStatusValidation.js'

const router = express.Router()

// Define routes for the /carStatuses endpoint
router
   .route('/')
   .post(validateSchema(carStatusValidationSchema), createCarStatus) 
   .get(getCarStatus) 

router
   .route('/car/:carId')
   .get(getCarStatusByCarId)
   .put(updateCarStatusByCarId)
   .delete(deleteCarStatusByCarId)

// Define routes for the /carStatuses/:id endpoint
router
   .route('/:id')
   .get(getCarStatusById) 
   .put(updateCarStatusById) 
   .delete(deleteCarStatusById) 

export default router
