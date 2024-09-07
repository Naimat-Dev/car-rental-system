import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Status 
export const createCarStatus = createOne( "carStatus");
export const getCarStatus  = getAll("carStatus")
export const getCarStatusById = getOne("carStatus") 
export const updateCarStatusById = updateOne("carStatus")
export const deleteCarStatusById = deleteOne("carStatus")