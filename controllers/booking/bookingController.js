import catchAsync from '../../utils/catchAsync.js'
import AppError from '../../utils/appError.js'
import db from '../../config/db.js'

import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'

// Function to create a new car booking
export const createCarBooking = catchAsync(async (req, res, next) => {
   const { customerId, carId, rentalStartDate, rentalEndDate, initialMileage } =
      req.body

   // Check if the customerId exists
   const customer = await db('customers').where({ id: customerId }).first()
   if (!customer) {
      return next(new AppError(`Customer not found by that ID.`, 404))
   }

   // Check if the carId exists
   const car = await db('car_specifications').where({ carId }).first()
   if (!car) {
      return next(new AppError(`Car not found by that ID.`, 404))
   }

   // Check if the car is available
   const carStatus = await db('car_status').where({ carId }).first()

   if (carStatus.availabilityStatus !== 'available') {
      return next(new AppError('Car is not available for booking.', 400))
   }

   // Calculate totalDays (difference between rentalStartDate and rentalEndDate)
   const startDate = new Date(rentalStartDate)
   const endDate = new Date(rentalEndDate)
   const timeDiff = endDate - startDate

   if (timeDiff < 0) {
      return next(new AppError('Invalid rental dates.', 400))
   }
   // Calculate total days (including partial days)
   const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

   // Calculate totalPrice (car price per day * totalDays)
   const totalPrice = car.pricePerDay * totalDays

   // Insert new booking into the database
   const booking = await db('bookings')
      .insert({
         customerId,
         carId,
         rentalStartDate,
         rentalEndDate,
         totalDays,
         initialMileage,
         totalPrice,
      })
      .returning('*')

   // Update the car's availability status to 'unavailable'
   const carStatusUpdate = await db('car_status')
      .where({ carId })
      .update({ availabilityStatus: 'unavailable' })
      .returning('*')

   if (!carStatusUpdate.length) {
      await db('bookings').where({ id: booking.id }).del()

      return next(new AppError(`Booking is not create successfully.`, 400))
   }

   res.status(201).json({
      status: 'success',
      doc: {
         booking,
         carStatusUpdate,
      },
   })
})

// // Function to get all booking

export const getBookings = getAll('bookings')

// Function to get a booking by ID
export const getBookingById = getOne('bookings')

// Function to update a booking by ID
export const updateCarBooking = updateOne('bookings')
// Function to delete a  by ID
export const deleteBookingById = deleteOne('bookings')
