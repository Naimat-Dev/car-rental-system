import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";
export const createCarType = createOne ('carTypes')

export const getCarTypes = getAll ('carTypes')

export const getCarTypeById = getOne ('carTypes')

export const updateCarTypeById = updateOne ('carTypes')

export const deleteCarTypeById = deleteOne ('carTypes')