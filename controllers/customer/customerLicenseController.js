import { createOne, getAll, getOne, updateOne, deleteOne } from "../handleFactory.js";


// Function to create a new customer License
export const createCustomerLicense = createOne('customer_license')

// // Function to get all customer License
export const getCustomerLicenses = getAll('customer_license')

// Function to get a customer License by ID
export const getCustomerLicenseById = getOne('customer_license')

// Function to update a customer License by ID
export const updateCustomerLicenseById = updateOne('customer_license')

// Function to delete a customer License by ID
export const deleteCustomerLicenseById = deleteOne('customer_license')

