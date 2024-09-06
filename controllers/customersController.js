import db from "../config/db.js";

// Function to create a new customer
export const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      password,
      cnic,
      phoneNumber,
      dateOfBirth,
      imageUrl,
      status,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !password ||
      !cnic ||
      !phoneNumber ||
      !dateOfBirth
    ) {
      return res.status(400).json({
        error:
          "All fields are required: firstName, lastName, password, cnic, phoneNumber, dateOfBirth, and status.",
      });
    }

    const existingCustomer = await db("customers")
      .where({ cnic })
      .orWhere({ phoneNumber })
      .first();
    if (existingCustomer) {
      return res.status(409).json({
        error:
          "CNIC or phone number already exists. Please provide unique details.",
      });
    }

    const insertedCustomer = await db("customers")
      .insert({
        firstName,
        lastName,
        password,
        cnic,
        phoneNumber,
        dateOfBirth,
        imageUrl,
        status,
      })
      .returning("*");

    const newCustomer = insertedCustomer[0];

    res.status(201).json({
      message: "Customer created successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await db("customers").select("*");

    if (customers.length === 0) {
      return res.status(404).json({ error: "No customers found" });
    }

    res.status(200).json({
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to get a customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await db("customers").where({ id }).first();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to update a customer by ID
export const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      password,
      cnic,
      phoneNumber,
      dateOfBirth,
      imageUrl,
      status,
    } = req.body;

    const existingCustomer = await db("customers").where({ id }).first();
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const customerConflict = await db("customers")
      .whereNot({ id })
      .andWhere((builder) => builder.where({ cnic }).orWhere({ phoneNumber }))
      .first();

    if (customerConflict) {
      return res.status(409).json({
        error:
          "CNIC or phone number already exists. Please provide unique details.",
      });
    }

    await db("customers").where({ id }).update({
      firstName,
      lastName,
      password,
      cnic,
      phoneNumber,
      dateOfBirth,
      imageUrl,
      status,
    });

    const updatedCustomer = await db("customers").where({ id }).first();

    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Function to delete a customer by ID
export const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const existingCustomer = await db("customers").where({ id }).first();
    if (!existingCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await db("customers").where({ id }).del();

    res.status(200).json({
      message: "Customer deleted successfully",
      data: existingCustomer,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}; 
