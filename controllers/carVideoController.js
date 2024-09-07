import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Video
export const createCarVideo = createOne('carVideos'); 
// Function to handle creating a new entry in the 'carVideos' table

// Retrieve all Car Videos
export const getCarVideos = getAll('carVideos'); 
// Function to handle retrieving all car video entries from the 'carVideos' table

// Retrieve a Car Video entry by ID
export const getCarVideoById = getOne('carVideos'); 
// Function to handle retrieving a specific car video entry by its ID from the 'carVideos' table

// Update a Car Video entry by ID
export const updateCarVideoById = updateOne('carVideos'); 
// Function to handle updating a specific car video entry by its ID in the 'carVideos' table

// Delete a Car Video entry by ID
export const deleteCarVideoById = deleteOne('carVideos'); 
// Function to handle deleting a specific car video entry by its ID from the 'carVideos' table
