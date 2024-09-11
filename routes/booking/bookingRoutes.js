import express from 'express'

import { validateSchema } from '../../middlewares/validationMiddleware.js'

import { bookingValidationSchema } from './../../validations/booking/bookingValidation.js'
import {
   createCarBooking,
   deleteBookingById,
   getBookings,
   getBookingById,
   updateCarBooking,
} from '../../controllers/booking/bookingController.js'

const router = express.Router()

router
   .route('/')
   .post(validateSchema(bookingValidationSchema), createCarBooking)
   .get(getBookings)

router
   .route('/:id')
   .get(getBookingById)
   .delete(deleteBookingById)
   .put(updateCarBooking)

export default router
