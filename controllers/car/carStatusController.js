import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";
import { deleteOneByCarId, getOneByCarId, updateOneByCarId } from "./carController.js";

// Create a new Car Status
export const createCarStatus = createOne('carStatus'); 

// Retrieve all Car Status entries
export const getCarStatus = getAll('carStatus'); 

// Retrieve a Car Status entry by ID
export const getCarStatusById = getOne('carStatus'); 

// Update a Car Status entry by ID
export const updateCarStatusById = updateOne('carStatus'); 

// Delete a Car Status entry by ID
export const deleteCarStatusById = deleteOne('carStatus'); 


export const getCarStatusByCarId = getOneByCarId('carStatus');
export const updateCarStatusByCarId =updateOneByCarId('carStatus')
export const deleteCarStatusByCarId = deleteOneByCarId('carStatus')