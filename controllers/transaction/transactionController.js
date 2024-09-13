import catchAsync from "../utils/catchAsync"; 
import db from "../../config/db";

// Function to create a new transaction
export const createTransaction = catchAsync(async (req, res) => {
  const {
    customerId,
    bookingId,
    ownerId,
    additionalCharges,
    rentalCharges,
    status,
    paymentMethod,
    paymentDate,
  } = req.body;

  // Check if customer, booking, and owner exist
  const customer = await db("customers").where({ id: customerId }).first();
  const booking = await db("bookings").where({ id: bookingId }).first();
  const owner = await db("users").where({ id: ownerId }).first();

  if (!customer) {
    return res.status(404).json({ error: "Customer not found." });
  }

  if (!booking) {
    return res.status(404).json({ error: "Booking not found." });
  }

  if (!owner) {
    return res.status(404).json({ error: "Owner not found." });
  }

  // Create the new transaction
  const newTransaction = await db("transactions").insert({
    customerId,
    bookingId,
    ownerId,
    additionalCharges,
    rentalCharges,
    status,
    paymentMethod,
    paymentDate,
  });

  res.status(201).json({ message: "Transaction created successfully.", data: newTransaction });
});


// Function to get all booking
export const getTransactions = getAll('transactions')

// Function to get a booking by ID
export const getTransactionById = getOne('transactions')

// Function to update a booking by ID
export const updateTransactionById = updateOne('transactions')
// Function to delete a  by ID
export const deleteTransactionById = deleteOne('transactions')
