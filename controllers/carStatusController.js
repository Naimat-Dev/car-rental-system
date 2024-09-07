import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Status
export const createCarStatus = createOne('carStatus'); 
// Function to handle creating a new car status entry in the 'carStatus' table

// Retrieve all Car Status entries
export const getCarStatus = getAll('carStatus'); 
// Function to handle retrieving all car status entries from the 'carStatus' table

// Retrieve a Car Status entry by ID
export const getCarStatusById = getOne('carStatus'); 
// Function to handle retrieving a specific car status entry by its ID from the 'carStatus' table

// Update a Car Status entry by ID
export const updateCarStatusById = updateOne('carStatus'); 
// Function to handle updating a specific car status entry by its ID in the 'carStatus' table

// Delete a Car Status entry by ID
export const deleteCarStatusById = deleteOne('carStatus'); 
// Function to handle deleting a specific car status entry by its ID from the 'carStatus' table
