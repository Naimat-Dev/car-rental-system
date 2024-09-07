import { createOne, getAll, getOne, updateOne, deleteOne } from "./handleFactory.js";


// POST create new customer
export const createCustomer = createOne('customers')

//get all customers
export const getCustomers = getAll('customers')

// GET customers by id
export const getCustomerById = getOne('customers')

// UPDATE customer by id
export const updateCustomerById = updateOne('customers')

// Function to delete a customer by ID
export const deleteCustomerById = deleteOne('customers')

