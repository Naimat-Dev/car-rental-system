import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import db from "../../config/db.js";

import {
  getAll,
  getOne,
  deleteOne,
} from "../handleFactory.js";

// Function to create a new car booking
export const createCarBooking = catchAsync(async (req, res, next) => {
  const {
    customerId,
    carId,
    rentalStartDate,
    rentalEndDate,
    initialMileage,
    paymentMethod,
  } = req.body;

  // Check if the customerId exists
  const customer = await db("customers").where({ id: customerId }).first();
  if (!customer) {
    return next(new AppError("Customer not found.", 404));
  }

  // Check if the carId exists
  const car = await db("carSpecifications").where({ carId }).first();
  if (!car) {
    return next(new AppError("Car not found.", 404));
  }

  // Check if the car is available
  const carStatus = await db("carStatus").where({ carId }).first();
  if (carStatus.availabilityStatus !== "available") {
    return next(new AppError("Car is not available for booking.", 400));
  }

  // Calculate totalDays (difference between rentalStartDate and rentalEndDate)
  const startDate = new Date(rentalStartDate);
  const endDate = new Date(rentalEndDate);
  const timeDiff = endDate - startDate;

  if (timeDiff < 0) {
    return next(new AppError("Invalid rental dates.", 400));
  }

  // Calculate total days (including partial days)
  const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Calculate totalPrice (car price per day * totalDays)
  const totalPrice = car.pricePerDay * totalDays;

  // Start a transaction to ensure atomicity
  await db.transaction(async (trx) => {
    // Insert new booking into the database
    const [booking] = await trx("bookings")
      .insert({
        customerId,
        carId,
        rentalStartDate,
        rentalEndDate,
        totalDays,
        initialMileage,
        totalPrice,
      })
      .returning("*");

    // Update the car's availability status to 'unavailable'
    await trx("carStatus")
      .where({ carId })
      .update({ availabilityStatus: "unavailable" });

    // Create a transaction record for the booking
    const paymentDate = new Date();
    const [transaction] = await trx("transactions")
      .insert({
        customerId,
        bookingId: booking.id,
        ownerId: car.ownerId,
        rentalCharges: totalPrice,
        paymentMethod,
        paymentDate,
        status: "pending",
      })
      .returning("*");

    // Prepare the response document
    const doc = { booking, transaction };

    if (!doc) {
      return next(
        new AppError("Booking and transaction could not be created", 400)
      );
    }

    res.status(201).json({
      status: "success",
      doc,
    });
  });
});

// // Function to get all booking
export const getBooking = getAll("bookings");

// Function to get a booking by ID
export const getBookingById = getOne("bookings");

// Function to update a booking by ID
export const updateCarBooking = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    rentalStartDate,
    rentalEndDate,
    totalDays,
    initialMileage,
    totalPrice,
    carId,
    customerId,
  } = req.body;

  // Check if the booking exists
  const [existingBooking] = await db("bookings").where({ id }).returning("*");
  if (!existingBooking) {
    return next(new AppError("Car booking not found.", 404));
  }

  // Validate carId if provided
  if (carId) {
    const car = await db("cars").where({ id: carId }).first();
    if (!car) {
      return next(new AppError("Car not found.", 404));
    }
  }

  // Validate customerId if provided
  if (customerId) {
    const customer = await db("customers").where({ id: customerId }).first();
    if (!customer) {
      return next(new AppError("Customer not found.", 404));
    }
  }

  // Update the booking details
  const [updatedBooking] = await db("bookings")
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
      carId: carId || existingBooking.carId,
      customerId: customerId || existingBooking.customerId,
    })
    .returning("*");

  if (!updatedBooking) {
    return next(new AppError("Failed to update car booking.", 400));
  }

  res.status(200).json({
    status: "success",
    doc: updatedBooking,
  });
});

// Function to delete booking  by ID
export const deleteBookingById = deleteOne("bookings");
