import catchAsync from '../../utils/catchAsync.js'
import AppError from '../../utils/appError.js'
import db from '../../config/db.js'

import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'

// Function to create a new car booking
export const createCarBooking = catchAsync(async (req, res) => {
   const {
      customerId,
      carId,
      rentalStartDate,
      rentalEndDate,
      initialMilesage,
   } = req.body

   // Check if the customerId exists
   const customer = await db('customers').where({ id: customerId }).first()
   if (!customer) {
      return next(new AppError(`Customer not found by that ID.`, 404))
   }

   console.log(customer)

   // Check if the carId exists
   const car = await db('carSpecifications').where({ carId }).first()
   if (!car) {
      return next(new AppError(`Car not found by that ID.`, 404))
   }

   // Check if the car is available
   const carStatus = await db('carStatus').where({ carId }).first()
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
   console.log(totalDays)

   console.log(car)

   // Calculate totalPrice (car price per day * totalDays)
   const totalPrice = car.pricePerDay * totalDays

   console.log(totalPrice)

   // Insert new booking into the database
   const booking = await db('bookings')
      .insert({
         customerId,
         carId,
         rentalStartDate,
         rentalEndDate,
         totalDays,
         initialMilesage,
         totalPrice,
      })
      .returning('*')

   // Update the car's availability status to 'unavailable'
   await db('carStatus')
      .where({ carId })
      .update({ availabilityStatus: 'unavailable' })

   const transaction = await db('transactions').insert({
      customerId,
      bookingId: booking.id,
      ownerId: car.ownerId,
      rentalCharges: totalPrice,
      paymentMethod,
      paymentDate,
      status: 'pending',
   })

   if (!transaction || !booking) {
      return next(new AppError('Booking and transaction are added.', 400))
   }

   res.status(201).json({
      status: 'success',
      doc: {
         booking,
         transaction,
      },
   })
})

// // Function to get all booking
export const getBooking = getAll('bookings')

// Function to get a booking by ID
export const getBookingById = getOne('bookings')

// Function to update a booking by ID
export const updateCarBooking = catchAsync(async (req, res) => {
   const { id } = req.params
   const {
      rentalStartDate,
      rentalEndDate,
      totalDays,
      initialMileage,
      totalPrice,
   } = req.body

   // Check if the booking exists
   const existingBooking = await db('bookings').where({ id }).first()

   if (!existingBooking) {
      return next(new AppError(`Booking not found by that ID.`, 404))
   }

   // Optional: If carId or customerId needs to be updated, you can validate them
   const { carId, customerId } = req.body
   if (carId) {
      const car = await db('cars').where({ id: carId }).first()
      if (!car) {
         return res.status(404).json({ error: 'Car not found.' })
      }
   }

   if (customerId) {
      const customer = await db('customers').where({ id: customerId }).first()
      if (!customer) {
         return res.status(404).json({ error: 'Customer not found.' })
      }
   }

   // Update the booking details
   await db('bookings')
      .where({ id })
      .update({
         rentalStartDate: rentalStartDate || existingBooking.rentalStartDate,
         rentalEndDate: rentalEndDate || existingBooking.rentalEndDate,
         totalDays: totalDays || existingBooking.totalDays,
         initialMileage:
            initialMileage !== undefined
               ? initialMileage
               : existingBooking.initialMileage,
         totalPrice: totalPrice || existingBooking.totalPrice,
         carId: carId || existingBooking.carId, // Only update if carId is provided
         customerId: customerId || existingBooking.customerId, // Only update if customerId is provided
      })

   res.status(200).json({ message: 'Car booking updated successfully.' })
})

// Function to delete a  by ID
export const deleteBookingById = deleteOne('bookings')
