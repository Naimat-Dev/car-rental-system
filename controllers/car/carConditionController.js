import { getAll, getOne, deleteOne } from '../handleFactory.js'

import catchAsync from '../../utils/catchAsync.js'
import db from './../../config/db.js'

// Create a new car condition
export const createCarCondition = catchAsync(async (req, res) => {
   const { carId, conditionType, imageUrls, videoUrls } = req.body

   if (!carId || !conditionType) {
      return res
         .status(400)
         .json({ error: 'carId and conditionType are required.' })
   }

   const newCarCondition = await db('car_conditions')
      .insert({
         carId,
         conditionType,
         imageUrls: JSON.stringify(imageUrls || []), // Store imageUrls as JSON
         videoUrls: JSON.stringify(videoUrls || []), // Store videoUrls as JSON
      })
      .returning('*')

   res.status(200).json({
      status: 'success',
      doc: newCarCondition,
   })
})

// Function to get all car
export const getCarConditions = getAll('car_conditions')

// Function to get a car
export const getCarConditionById = getOne('car_conditions')

// Update an existing car condition condition
export const updateCarConditionById = catchAsync(async (req, res) => {
   const { id } = req.params
   const { conditionType, imageUrls, videoUrls } = req.body

   const existingCarCondition = await db('car_conditions').where({ id }).first()
   if (!existingCarCondition) {
      return res.status(404).json({ error: 'Car condition not found.' })
   }

   // Update the car condition
   await knex('car_conditions')
      .where({ id })
      .update({
         conditionType: conditionType || existingCarCondition.conditionType,
         imageUrls: imageUrls
            ? JSON.stringify(imageUrls)
            : existingCarCondition.imageUrls,
         videoUrls: videoUrls
            ? JSON.stringify(videoUrls)
            : existingCarCondition.videoUrls,
      })

   res.status(200).json({ message: 'Car condition updated successfully.' })
})

// Function to delete a customer address by ID
export const deleteCarConditionById = deleteOne('car_conditions')
