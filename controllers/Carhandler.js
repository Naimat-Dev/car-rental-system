import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car
export const createCar = createOne('cars'); // Function to handle creating a new car entry in the 'cars' table

// Retrieve all Cars
export const getCars = getAll('cars'); // Function to handle retrieving all car entries from the 'cars' table

// Retrieve a Car by ID
export const getCarById = getOne('cars'); // Function to handle retrieving a specific car entry by its ID from the 'cars' table

// Update a Car by ID
export const updateCarById = updateOne('cars'); // Function to handle updating a specific car entry by its ID in the 'cars' table

// Delete a Car by ID
export const deleteCarById = deleteOne('cars'); // Function to handle deleting a specific car entry by its ID from the 'cars' table