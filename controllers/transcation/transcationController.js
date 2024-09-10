import { createOne, getAll, getOne, updateOne, deleteOne } from "../handleFactory.js";

// Function to create a new customer address
export const createTranscations = createOne('transcations')

// // Function to get all customer addresses
export const getTranscations = getAll('transcations')

// Function to get a customer address by ID
export const getTranscationsById = getOne('transcations')

// Function to update a customer address by ID
export const updateTranscationsById = updateOne('transcations')

// Function to delete a customer address by ID
export const deleteTranscationsById = deleteOne('transcations')

