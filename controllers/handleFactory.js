import db from '../config/db.js'

import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import APIFeatures from './../utils/apiFeatures.js'

// CREATE One Document
export const createOne = (Table) =>
   catchAsync(async (req, res, next) => {

      if(req.body.imageUrls || req.body.videoUrls){
         req.body.imageUrls= JSON.stringify(req.body.imageUrls)
         req.body.videoUrls = JSON.stringify( req.body.videoUrls)
      }

      const doc = await db(Table).insert(req.body).returning('*')

      if (!doc) {
         return next(new AppError(`${Table} could not be created`, 400))
      }

      res.status(201).json({
         status: 'success',
         doc,
      })
   })

// // Get all records
export const getAll = (Table) =>
   catchAsync(async (req, res, next) => {
      // const doc = await db.select("*").from(Table);

      // Start with your table query
      const query = db(Table)

      // Now apply filter, sort, fields limit and pagination using api features class
      const features = new APIFeatures(query, req.query)
         .filter()
         .sort()
         .fieldsLimit()
         .paginate()

      // Finally the query is built and then apply them to get the actual data (Records from given tabel)
      const doc = await features.query

      if (!doc.length) {
         return res.status(404).json({
            status: 'fail',
            message: `No ${Table} found.`,
         })
      }

      res.status(200).json({
         status: 'success',
         results: doc.length,
         doc,
      })
   })

// Get single record
export const getOne = (Table) =>
   catchAsync(async (req, res, next) => {
      const { id } = req.params

      const doc = await db(Table).where({ id })

      if (!doc.length) {
         return next(new AppError(`${Table} not found by that ID.`, 404))
      }

      res.status(200).json({
         status: 'success',
         doc,
      })
   })

// Delete single record
export const deleteOne = (Table) =>
   catchAsync(async (req, res, next) => {
      const { id } = req.params

      const doc = await db(Table).where({ id }).del()

      if (!doc) {
         return next(new AppError(`${Table} not found by that ID.`, 404))
      }

      res.status(204).json({
         status: 'success',
         doc,
      })
   })

// Update single record
export const updateOne = (Table) =>
   catchAsync(async (req, res, next) => {
      const { id } = req.params
      const updateData = req.body
      if(req.body.imageUrls && req.body.videoUrls){
         req.body.imageUrls= JSON.stringify(req.body.imageUrls)
         req.body.videoUrls = JSON.stringify( req.body.videoUrls)}
      // Add the updated_at field to the update data
      updateData.updated_at = new Date()

      const doc = await db(Table)
         .where({ id })
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
