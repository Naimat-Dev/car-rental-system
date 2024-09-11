import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";

export const createBrand = createOne("brands"); 

export const getBrands = getAll("brands"); 

export const getBrandById = getOne("brands"); 

export const updateBrandById = updateOne("brands"); 

export const deleteBrandById = deleteOne("brands"); 
