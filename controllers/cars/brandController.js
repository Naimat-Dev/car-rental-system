import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";
// Create a new Brand
export const createBrand = createOne("brands"); 

// Retrieve all Brands
export const getBrands = getAll("brands"); 

// Retrieve a Brand by ID
export const getBrandById = getOne("brands"); 

// Update a Brand by ID
export const updateBrandById = updateOne("brands"); 

// Delete a Brand by ID
export const deleteBrandById = deleteOne("brands"); 
