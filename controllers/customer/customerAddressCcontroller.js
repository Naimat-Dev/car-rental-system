import { createOne, getAll, getOne, updateOne, deleteOne } from "../handleFactory.js";

// Function to create a new customer address
export const createCustomerAddress = createOne('customerAddress')

// // Function to get all customer addresses
export const getCustomerAddress = getAll('customerAddress')

// Function to get a customer address by ID
export const getCustomerAddressById = getOne('customerAddress')

// Function to update a customer address by ID
export const updateCustomerAddressById = updateOne('customerAddress')

// Function to delete a customer address by ID
export const deleteCustomerAddressById = deleteOne('customerAddress')

