import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";

// Create a new Car Type
export const createCarType = createOne('carTypes'); 
// Function to handle creating a new entry in the 'carTypes' table

// Retrieve all Car Types
export const getCarTypes = getAll('carTypes'); 
// Function to handle retrieving all car type entries from the 'carTypes' table

// Retrieve a Car Type entry by ID
export const getCarTypeById = getOne('carTypes'); 
// Function to handle retrieving a specific car type entry by its ID from the 'carTypes' table

// Update a Car Type entry by ID
export const updateCarTypeById = updateOne('carTypes'); 
// Function to handle updating a specific car type entry by its ID in the 'carTypes' table

// Delete a Car Type entry by ID
export const deleteCarTypeById = deleteOne('carTypes'); 
// Function to handle deleting a specific car type entry by its ID from the 'carTypes' table
