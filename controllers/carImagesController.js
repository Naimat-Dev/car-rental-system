import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Image
export const createCarImages = createOne( "carImages");
export const getCarImages  = getAll("carImages")
export const getCarImagesById = getOne("carImages") 
export const updateCarImagesById = updateOne("carImages")
export const deleteCarImagesById = deleteOne("carImages")