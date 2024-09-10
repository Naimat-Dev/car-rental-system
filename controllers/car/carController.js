import {
   createOne,
   getAll,
   getOne,
   deleteOne,
   updateOne,
} from '../handleFactory.js'

import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/appError.js';
import db from "../../config/db.js";

export const createCar = createOne('cars')

export const getCars = getAll('cars')

export const getCarById = getOne('cars')

export const updateCarById = updateOne('cars')

export const deleteCarById = deleteOne('cars')

export const getCarDetailsWithJoinById = catchAsync(async (req, res, next) => {
		const {id} = req.params;
      const allData = await db('cars')
         .join('brands', 'brands.id', 'cars.brandId')
         .join('carTypes', 'carTypes.id', 'cars.carTypeId')
         .join('carSpecifications', 'carSpecifications.carId', 'cars.id')
         .join('carStatus', 'carStatus.carId', 'cars.id')
         .join('carsMedia', 'carsMedia.carId', 'cars.id')
         .join('users', 'users.id','cars.ownerId' )
         .select('*')
         .where('cars.id', id ).first()
         if(allData){
            res.status(200).json({
               status: 'success',
               doc :allData,
            })
           }
           else{
            return next(new AppError(` cars  not found by that ID.`, 404))
           }
})

export const getCarsDetailsWithJoin = catchAsync(async (req, res, next) => {
   const alldata = await db('cars')
      .join('brands', 'brands.id', 'cars.brandId')
      .join('carTypes', 'carTypes.id', 'cars.carTypeId')
      .join('carSpecifications', 'carSpecifications.carId', 'cars.id')
      .join('carStatus', 'carStatus.carId', 'cars.id')
      .join('carsMedia', 'carsMedia.carId', 'cars.id')
      .join('users', 'users.id','cars.ownerId' )
      .select('*')
   
  if(alldata){
   res.status(200).json({
      status: 'success',
      doc :alldata,
   })
  }
  else{
   return next(new AppError(` cars  not found by that ID.`, 404))
  }
})


export const updateOneByCarId = (Table) =>
   catchAsync(async (req, res, next) => {
      const { carId } = req.params
      const updateData = req.body
      if(req.body.imageUrls && req.body.videoUrls){
         req.body.imageUrls= JSON.stringify(req.body.imageUrls)
         req.body.videoUrls = JSON.stringify( req.body.videoUrls)}
      // Add the updated_at field to the update data
      updateData.updated_at = new Date()

      const doc = await db(Table)
         .where({ carId })
         .update(updateData)
         .returning('*')

      if (!doc.length) {
         return next(new AppError(`${Table} not found by that ID.`, 404))
      }

      res.status(200).json({
         status: 'success',
         doc,
      })
   })

export const deleteOneByCarId =(Table) =>
   catchAsync(async (req, res, next) => {
      const { carId } = req.params

      const doc = await db(Table).where({ carId }).del()
      if (!doc) {
         return next(new AppError(`${Table} not found by that ID.`, 404))
      }

      res.status(204).json({
         status: 'success',
         doc,
      })
   })

   export const getOneByCarId =(Table) =>
      catchAsync(async (req, res, next) => {
         const { carId } = req.params
   
         const doc = await db(Table).where({ carId })
   
         if (!doc.length) {
            return next(new AppError(`${Table} not found by that ID.`, 404))
         }
   
         res.status(200).json({
            status: 'success',
            doc,
         })
      })
