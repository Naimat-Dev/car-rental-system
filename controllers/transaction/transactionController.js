import db from "../../config/db.js";
import catchAsync from "../../utils/catchAsync.js";
import { getAll, getOne, deleteOne, updateOne } from "../handleFactory.js";

// Function to create a new transaction
export const createTransaction = catchAsync(async (req, res) => {
  const {
    customerId,
    bookingId,
    ownerId,
    status,
    additionalCharges,
    rentalCharges,
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
  const doc = await db("transactions").insert({
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
    doc,
  });
});

// Function to get all booking
export const getTransactions = getAll("transactions");

// Function to get a booking by ID
export const getTransactionById = getOne("transactions");

// Function to update a booking by ID
export const updateTransactionById = updateOne("transactions");

// Function to delete a  by ID
export const deleteTransactionById = deleteOne("transactions");

//joins
export const joinAllTransactionsDetails = catchAsync(
  async (req, res, next) => {
    const transactions = await db("transactions as t")
      .join("customers as c", "t.customerId", "c.id")
      .join("users as u", "t.ownerId", "u.id")
      .leftJoin("bookings as b", "t.bookingId", "b.id")
      .select(
        "t.id as transactionId",
        "t.additionalCharges",
        "t.rentalCharges",
        "t.totalAmount",
        "t.status as transactionStatus",
        "t.paymentMethod",
        "t.paymentDate",
        "c.id as customerId",
        "c.firstName as customerFirstName",
        "c.lastName as customerLastName",
        "c.cnic as customerCnic",
        "c.phoneNumber as customerPhoneNumber",
        "u.id as userId",
        "u.name as userName",
        "u.email as userEmail",
        "u.phoneNumber as userPhoneNumber",
        "u.registrationDate as userRegistrationDate",
        "b.rentalStartDate as bookingStartDate",
        "b.rentalEndDate as bookingEndDate",
        "b.totalPrice as bookingTotalPrice"
      );

    res.status(200).json({
      status: "success",
      data: transactions,
    });
  }
);

// Function to get transaction details by ID with customer and user (owner) information
export const joinTransactionDetailsById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const transaction = await db("transactions as t")
      .join("customers as c", "t.customerId", "c.id")
      .join("users as u", "t.ownerId", "u.id")
      .leftJoin("bookings as b", "t.bookingId", "b.id")
      .where("t.id", id)
      .first()
      .select(
        "t.id as transactionId",
        "t.additionalCharges",
        "t.rentalCharges",
        "t.totalAmount",
        "t.status as transactionStatus",
        "t.paymentMethod",
        "t.paymentDate",
        "c.id as customerId",
        "c.firstName as customerFirstName",
        "c.lastName as customerLastName",
        "c.cnic as customerCnic",
        "c.phoneNumber as customerPhoneNumber",
        "u.id as userId",
        "u.name as userName",
        "u.email as userEmail",
        "u.phoneNumber as userPhoneNumber",
        "u.registrationDate as userRegistrationDate",
        "b.rentalStartDate as bookingStartDate",
        "b.rentalEndDate as bookingEndDate",
        "b.totalPrice as bookingTotalPrice"
      );

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    res.status(200).json({
      status: "success",
      data: transaction,
    });
  }
);
