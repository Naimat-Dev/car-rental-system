
import db from "../config/db.js";
import {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "./handleFactory.js";

// POST create new customer
export const createCustomer = createOne("customers");

//get all customers
export const getCustomers = getAll("customers");

// GET customers by id
export const getCustomerById = getOne("customers");

// UPDATE customer by id
export const updateCustomerById = updateOne("customers");


// Function to delete a customer by ID
export const deleteCustomerById = deleteOne("customers");


//Get customer details by ID (joins)
export const getCustomersJoinById = async (req, res) => {
  const { id } = req.params;

  try {
    const customerDetails = await db("customers")
      .join("customerAddress", "customers.id", "customerAddress.customerId")
      .join("customerLicense", "customers.id", "customerLicense.customerId")
      .select(
        "customers.id",
        "customers.firstName",
        "customers.lastName",
        "customers.cnic",
        "customers.phoneNumber",
        "customers.dateOfBirth",
        "customers.imageUrl",
        "customers.status",
        "customerAddress.address",
        "customerAddress.city",
        "customerAddress.state",
        "customerAddress.zipCode",
        "customerAddress.country",
        "customerLicense.drivingLicenseNumber",
        "customerLicense.licenseExpiryDate"
      )
      .where("customers.id", id);

    if (customerDetails.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customerDetails);
  } catch (error) {
    console.error("Error fetching customer details:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

//Get Customer DEtails Join
export const getAllCustomersJoin = async (req, res) => {
    try {
      const customerDetails = await db("customers")
        .join("customerAddress", "customers.id", "customerAddress.customerId")
        .join("customerLicense", "customers.id", "customerLicense.customerId")
        .select(
          "customers.id",
          "customers.firstName",
          "customers.lastName",
          "customers.cnic",
          "customers.phoneNumber",
          "customers.dateOfBirth",
          "customers.imageUrl",
          "customers.status",
          "customerAddress.address",
          "customerAddress.city",
          "customerAddress.state",
          "customerAddress.zipCode",
          "customerAddress.country",
          "customerLicense.drivingLicenseNumber",
          "customerLicense.licenseExpiryDate"
        );
  
      if (customerDetails.length === 0) {
        return res.status(404).json({ message: "No customers found" });
      }
  
      res.status(200).json(customerDetails);
    } catch (error) {
      console.error("Error fetching customer details:", error.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  };

export const deleteCustomerById = deleteOne('customers')
