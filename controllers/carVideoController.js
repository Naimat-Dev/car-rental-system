import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

export const createCarVideo = createOne ('carVideos')
export const getCarVideos = getAll('carVideos')
export const getCarVideoById = getOne ('carVideos')
export const updateCarVideoById = updateOne ('carVideos')
export const deleteCarVideoById = deleteOne ('carVideos') 