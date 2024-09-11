import {
   createOne,
   getAll,
   getOne,
   deleteOne,
   updateOne,
} from '../handleFactory.js'
import {
   deleteOneByCarId,
   getOneByCarId,
   updateOneByCarId,
} from './carController.js'
export const createCarStatus = createOne('carStatus')

export const getCarStatus = getAll('carStatus')

export const getCarStatusById = getOne('carStatus')

export const updateCarStatusById = updateOne('carStatus')

export const deleteCarStatusById = deleteOne('carStatus')

export const getCarStatusByCarId = getOneByCarId('carStatus')

export const updateCarStatusByCarId = updateOneByCarId('carStatus')

export const deleteCarStatusByCarId = deleteOneByCarId('carStatus')
