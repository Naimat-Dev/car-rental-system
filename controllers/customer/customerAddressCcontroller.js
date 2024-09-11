import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'

// Function to create a new customer address
export const createCustomerAddress = createOne("customer_address");

// // Function to get all customer addresses
export const getCustomerAddress = getAll("customer_address");

// Function to get a customer address by ID
export const getCustomerAddressById = getOne("customer_address");

// Function to update a customer address by ID
export const updateCustomerAddressById = updateOne("customer_address");

// Function to delete a customer address by ID
export const deleteCustomerAddressById = deleteOne("customer_address");
