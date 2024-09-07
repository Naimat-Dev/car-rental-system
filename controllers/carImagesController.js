import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Image
export const createCarImages = createOne('carImages'); // Function to handle creating a new car image entry in the 'carImages' table

// Retrieve all Car Images
export const getCarImages = getAll('carImages'); // Function to handle retrieving all car image entries from the 'carImages' table

// Retrieve a Car Image by ID
export const getCarImagesById = getOne('carImages'); // Function to handle retrieving a specific car image entry by its ID from the 'carImages' table

// Update a Car Image by ID
export const updateCarImagesById = updateOne('carImages'); // Function to handle updating a specific car image entry by its ID in the 'carImages' table

// Delete a Car Image by ID
export const deleteCarImagesById = deleteOne('carImages'); // Function to handle deleting a specific car image entry by its ID from the 'carImages' table