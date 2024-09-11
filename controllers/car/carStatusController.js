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

<<<<<<< HEAD
export const createCarStatus = createOne('car_status'); 

export const getCarStatus = getAll('car_status'); 

export const getCarStatusById = getOne('car_status'); 

export const updateCarStatusById = updateOne('car_status'); 

export const deleteCarStatusById = deleteOne('car_status'); 

export const getCarStatusByCarId = getOneByCarId('car_status');

export const updateCarStatusByCarId =updateOneByCarId('car_status')

export const deleteCarStatusByCarId = deleteOneByCarId('car_status')
=======
export const getCarStatus = getAll('carStatus')

export const getCarStatusById = getOne('carStatus')

export const updateCarStatusById = updateOne('carStatus')

export const deleteCarStatusById = deleteOne('carStatus')

export const getCarStatusByCarId = getOneByCarId('carStatus')

export const updateCarStatusByCarId = updateOneByCarId('carStatus')

export const deleteCarStatusByCarId = deleteOneByCarId('carStatus')
>>>>>>> test
