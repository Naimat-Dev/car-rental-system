import catchAsync from '../../utils/catchAsync.js'
import AppError from '../../utils/appError.js'
import db from '../../config/db.js'

import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'


export const createCarBooking = catchAsync(async (req, res, next) => {
   const { customerId, carId, rentalStartDate, rentalEndDate, initialMileage } = req.body;

   // Log incoming request data
   console.log('Received request to create car booking:', { customerId, carId, rentalStartDate, rentalEndDate, initialMileage });

 
   // Check if the customerId exists
   const customer = await db('customers').where({ id: customerId }).first();
   if (!customer) {
      console.log('Customer not found:', customerId);
      return next(new AppError('Customer not found by that ID.', 404));
   }
   console.log('Customer found:', customer);
   console.log('Car found:', carId);

   // Check if the carId exists in the cars table
   const car = await db('cars').where({ id: carId }).first();
   if (!car) {
      console.log('Car not found:', carId);
      return next(new AppError('Car not found by that ID.', 404));
   }
   console.log('Car found:', carId);

   // Check if the car is available
   // const carStatus = await db('car_status').where({ carId: carId }).first();
   // if (!carStatus) {
   //    console.log('Car status not found:', carId);
   //    return next(new AppError('Car status not found.', 404));
   // }

   // if (carStatus.availabilityStatus !== 'available') {
   //    console.log('Car is not available:', carId);
   //    return next(new AppError('Car is not available for booking.', 400));
   // }
   // console.log('Car status is available:', carStatus);

   // Calculate totalDays (difference between rentalStartDate and rentalEndDate)
   const startDate = new Date(rentalStartDate);
   const endDate = new Date(rentalEndDate);
   const timeDiff = endDate - startDate;

   if (timeDiff < 0) {
      console.log('Invalid rental dates:', { rentalStartDate, rentalEndDate });
      return next(new AppError('Invalid rental dates.', 400));
   }
   // Calculate total days (including partial days)
   const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
   console.log('Total days calculated:', totalDays);

   // Calculate totalPrice (car price per day * totalDays)
   const totalPrice = car.pricePerDay * totalDays; // Ensure pricePerDay exists in the cars table
   console.log('Total price calculated:', totalPrice);

   // Insert new booking into the database
   const [booking] = await db('bookings')
      .insert({
         customerId,
         carId: carId,
         rentalStartDate,
         rentalEndDate,
         totalDays,
         initialMileage,
         totalPrice,
      })
      .returning('*');
   console.log('Booking created:', booking);

   // Update the car's availability status to 'unavailable'
   // const [carStatusUpdate] = await db('car_status')
   //    .where({ carId: carId })
   //    .update({ availabilityStatus: 'unavailable' })
   //    .returning('*');

   // if (!carStatusUpdate) {
   //    console.log('Failed to update car status:', carId);
   //    await db('bookings').where({ id: booking.id }).del();
   //    return next(new AppError('Booking was not created successfully.', 400));
   // }
   // console.log('Car status updated to unavailable:', carStatusUpdate);

   res.status(201).json({
      status: 'success',
      doc: {
         booking,
         carStatusUpdate,
      },
   });
});

// // Function to get all booking

export const getBookings = getAll('bookings')

// Function to get a booking by ID
export const getBookingById = getOne('bookings')

// Function to update a booking by ID
export const updateCarBooking = updateOne('bookings')
// Function to delete a  by ID
export const deleteBookingById = deleteOne('bookings')
