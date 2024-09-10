import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "../handleFactory.js";
import { deleteOneByCarId, getOneByCarId, updateOneByCarId } from "./carController.js";

export const createCarSpecification = createOne('carSpecifications'); 

export const getCarSpecifications = getAll('carSpecifications'); 

export const getCarSpecificationById = getOne('carSpecifications'); 

export const updateCarSpecificationById = updateOne('carSpecifications'); 

export const deleteCarSpecificationById = deleteOne('carSpecifications'); 

export const  getCarSpecificationByCarId =  getOneByCarId('carSpecifications');

export const updateCarSpecificationByCarId = updateOneByCarId('carSpecifications');

export const deleteCarSpecificationByCarId = deleteOneByCarId('carSpecifications');