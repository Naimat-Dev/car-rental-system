import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";
export const createCarSpecification = 	createOne ("carSpecification") 

export const getCarSpecifications = getAll ("carSpecification") 

export const getCarSpecificationById = getOne ("carSpecification") 
export const updateCarSpecificationById = updateOne ("carSpecification") 

export const deleteCarSpecificationById = deleteOne("carSpecification") 