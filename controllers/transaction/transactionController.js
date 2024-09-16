import db from "../../config/db.js";
import catchAsync from "../../utils/catchAsync.js";
import { deleteOne, getAll, getOne, updateOne } from "../handleFactory.js";

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

  res.status(201).json({
    message: "Transaction created successfully.",
    data: newTransaction,
  });
});

// Function to get all transaction
export const getTransactions = getAll("transactions");

// Function to get a transaction by ID
export const getTransactionById = getOne("transactions");

// Function to update an existing transaction
export const updateTransaction = catchAsync(async (req, res) => {
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
  const { id } = req.params;

  // Check if transaction exists
  const transaction = await db("transactions").where({ id }).first();
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found." });
  }

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

  // Update the transaction with new data
  const updatedTransaction = await db("transactions").where({ id }).update(
    {
      customerId,
      bookingId,
      ownerId,
      additionalCharges,
      rentalCharges,
      status,
      paymentMethod,
      paymentDate,
    },
    [
      "id",
      "customerId",
      "bookingId",
      "ownerId",
      "additionalCharges",
      "rentalCharges",
      "status",
      "paymentMethod",
      "paymentDate",
    ]
  ); // Returning the updated transaction data

  res.status(200).json({
    message: "Transaction updated successfully.",
    data: updatedTransaction,
  });
});

// Function to delete a  by ID
export const deleteTransactionById = deleteOne("transactions");
