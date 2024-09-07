import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Specification
export const createCarSpecification = createOne('carSpecifications'); 
// Function to handle creating a new car specification entry in the 'carSpecifications' table

// Retrieve all Car Specifications
export const getCarSpecifications = getAll('carSpecifications'); 
// Function to handle retrieving all car specification entries from the 'carSpecifications' table

// Retrieve a Car Specification by ID
export const getCarSpecificationById = getOne('carSpecifications'); 
// Function to handle retrieving a specific car specification entry by its ID from the 'carSpecifications' table

// Update a Car Specification by ID
export const updateCarSpecificationById = updateOne('carSpecifications'); 
// Function to handle updating a specific car specification entry by its ID in the 'carSpecifications' table

// Delete a Car Specification by ID
export const deleteCarSpecificationById = deleteOne('carSpecifications'); 
// Function to handle deleting a specific car specification entry by its ID from the 'carSpecifications' table
