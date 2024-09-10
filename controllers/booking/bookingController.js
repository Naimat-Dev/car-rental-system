import { createOne, getAll, getOne, updateOne, deleteOne } from "../handleFactory.js";
import catchAsync from '../utils/catchAsync.js';

// Function to create a new customer address
export const createCarBooking = catchAsync(async (req, res) => {
    const { customerId, carId, rentalStartDate, rentalEndDate, totalDays, initialMileage, totalPrice } = req.body;
  
    // Ensure required fields are provided
    if (!customerId || !carId || !rentalStartDate || !rentalEndDate || !totalDays || !initialMileage || !totalPrice) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Check if the customerId exists
    const customer = await knex('customers').where({ id: customerId }).first();
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found.' });
    }
  
    // Check if the carId exists
    const car = await knex('cars').where({ id: carId }).first();
    if (!car) {
      return res.status(404).json({ error: 'Car not found.' });
    }
  
    // Insert new booking into the database
    const [newBookingId] = await knex('bookings').insert({
      customerId,
      carId,
      rentalStartDate,
      rentalEndDate,
      totalDays,
      initialMileage,
      totalPrice,
    }).returning('id');
  
    res.status(201).json({
      message: 'Car booking created successfully.',
      bookingId: newBookingId,
    });
  });

// // Function to get all customer addresses
export const getBooking = getAll('bookings')

// Function to get a customer address by ID
export const getBookingById = getOne('bookings')

// Function to update a customer address by ID
export const updateCarBooking = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { rentalStartDate, rentalEndDate, totalDays, initialMileage, totalPrice } = req.body;
  
    // Check if the booking exists
    const existingBooking = await knex('bookings').where({ id }).first();
    if (!existingBooking) {
      return res.status(404).json({ error: 'Car booking not found.' });
    }
  
    // Optional: If carId or customerId needs to be updated, you can validate them
    const { carId, customerId } = req.body;
    if (carId) {
      const car = await knex('cars').where({ id: carId }).first();
      if (!car) {
        return res.status(404).json({ error: 'Car not found.' });
      }
    }
  
    if (customerId) {
      const customer = await knex('customers').where({ id: customerId }).first();
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found.' });
      }
    }
  
    // Update the booking details
    await knex('bookings')
      .where({ id })
      .update({
        rentalStartDate: rentalStartDate || existingBooking.rentalStartDate,
        rentalEndDate: rentalEndDate || existingBooking.rentalEndDate,
        totalDays: totalDays || existingBooking.totalDays,
        initialMileage: initialMileage !== undefined ? initialMileage : existingBooking.initialMileage,
        totalPrice: totalPrice || existingBooking.totalPrice,
        carId: carId || existingBooking.carId, // Only update if carId is provided
        customerId: customerId || existingBooking.customerId, // Only update if customerId is provided
      });
  
    res.status(200).json({ message: 'Car booking updated successfully.' });
  });
  
  

// Function to delete a customer address by ID
export const deleteBookingById = deleteOne('bookings')

