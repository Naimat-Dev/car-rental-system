import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";

export const createCarType = createOne('car_types'); 

export const getCarTypes = getAll('car_types'); 

export const getCarTypeById = getOne('car_types'); 

export const updateCarTypeById = updateOne('car_types'); 

export const deleteCarTypeById = deleteOne('car_types'); 

