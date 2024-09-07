import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Brand
export const createBrand = createOne("brands"); // Function to handle creating a new brand entry in the 'brands' table

// Retrieve all Brands
export const getBrands = getAll("brands"); // Function to handle retrieving all brand entries from the 'brands' table

// Retrieve a Brand by ID
export const getBrandById = getOne("brands"); // Function to handle retrieving a specific brand entry by its ID from the 'brands' table

// Update a Brand by ID
export const updateBrandById = updateOne("brands"); // Function to handle updating a specific brand entry by its ID in the 'brands' table

// Delete a Brand by ID
export const deleteBrandById = deleteOne("brands"); // Function to handle deleting a specific brand entry by its ID from the 'brands' table