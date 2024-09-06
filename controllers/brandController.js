import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";
// Create a new brand
export const createBrand = createOne( "brands");

// Get all brands
export const getBrands = getAll("brands")

// Get brand by ID
export const getBrandById = getOne("brands") 

// Update brand by ID
export const updateBrandById = updateOne("brands")

// Delete brand by ID
export const deleteBrandById = deleteOne("brands")