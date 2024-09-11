import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";
import { deleteOneByCarId, getOneByCarId, updateOneByCarId } from "./carController.js";

export const createCarSpecification = createOne('car_specifications'); 

export const getCarSpecifications = getAll('car_specifications'); 

export const getCarSpecificationById = getOne('car_specifications'); 

export const updateCarSpecificationById = updateOne('car_specifications'); 

export const deleteCarSpecificationById = deleteOne('car_specifications'); 

export const  getCarSpecificationByCarId =  getOneByCarId('car_specifications');

export const updateCarSpecificationByCarId = updateOneByCarId('car_specifications');

export const deleteCarSpecificationByCarId = deleteOneByCarId('car_specifications');