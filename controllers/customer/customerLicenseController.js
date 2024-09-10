import { createOne, getAll, getOne, updateOne, deleteOne } from "../handleFactory.js";


// Function to create a new customer License
export const createCustomerLicense = createOne('customerLicense')

// // Function to get all customer License
export const getCustomerLicenses = getAll('customerLicense')

// Function to get a customer License by ID
export const getCustomerLicenseById = getOne('customerLicense')

// Function to update a customer License by ID
export const updateCustomerLicenseById = updateOne('customerLicense')

// Function to delete a customer License by ID
export const deleteCustomerLicenseById = deleteOne('customerLicense')

