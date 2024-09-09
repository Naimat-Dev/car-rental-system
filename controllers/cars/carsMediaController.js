import {
   createOne,
   getAll,
   getOne,
   deleteOne,
   updateOne,
} from '../handleFactory.js'

// Create a new Car Media entry
export const createCarMedia = createOne('carsMedia')

// Retrieve all Car Media entries
export const getCarMedia = getAll('carsMedia')

// Retrieve a Car Media entry by ID
export const getCarMediaById = getOne('carsMedia')

// Update a Car Media entry by ID
export const updateCarMediaById = updateOne('carsMedia')

// Delete a Car Media entry by ID
export const deleteCarMediaById = deleteOne('carsMedia')
