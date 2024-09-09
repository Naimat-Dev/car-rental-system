import {
   createOne,
   getAll,
   getOne,
   deleteOne,
   updateOne,
} from '../handleFactory.js'
import db from '../../config/db.js'
// Create a new Car
export const createCar = createOne('cars')

// Retrieve all Cars
export const getCars = getAll('cars')

// Retrieve a Car by ID
export const getCarById = getOne('cars')

// Update a Car by ID
export const updateCarById = updateOne('cars')

// Delete a Car by ID
export const deleteCarById = deleteOne('cars')

export const allbyId = async (req, res) => {
   try {
      const { id } = req.params
      const alldatabyId = await db('cars')
         .join('brands', 'brands.id', 'cars.brandId')
         .join('carTypes', 'carTypes.id', 'cars.cartypeId')
         .join('carSpecifications', 'carSpecifications.carId', 'cars.id')
         .join('carStatus', 'carStatus.carId', 'cars.id')
         .join('carsMedia', 'carsMedia.carId', 'cars.id')
         .select('*')
         .where('cars.id', id)
         .first()
      console.log(alldatabyId)

      if (alldatabyId) {
         res.status(200).json({ alldatabyId })
      } else {
         res.status(300).json({
            message: 'Some Entities of table is missing',
         })
      }
   } catch (error) {
      console.log(error)
   }
}
