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

export const createCarStatus = createOne('car_status')

export const getCarStatus = getAll('car_status')

export const getCarStatusById = getOne('car_status')

export const updateCarStatusById = updateOne('car_status')

export const deleteCarStatusById = deleteOne('car_status')

export const getCarStatusByCarId = getOneByCarId('car_status')

export const updateCarStatusByCarId = updateOneByCarId('car_status')

export const deleteCarStatusByCarId = deleteOneByCarId('car_status')
