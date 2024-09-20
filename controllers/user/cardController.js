import db from '../../config/db.js'
import AppError from '../../utils/appError.js'
import catchAsync from '../../utils/catchAsync.js'
import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'

// Route  /cards
export const createCard = catchAsync(async (req, res, next) => {
   const {
      ownerId,
      ownerType,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      billingAddress,
   } = req.body

   const existingCard = await db('cards').where({ cardNumber }).first()

   if (existingCard) {
      return next(
         new AppError('Card with this card number already exists', 400)
      )
   }
   const doc = await db('cards')
      .insert({
         ownerId,
         ownerType,
         cardHolderName,
         cardNumber,
         expiryDate,
         cvv,
         billingAddress,
      })
      .returning('*')

   res.status(201).json({
      status: 'success',
      doc,
   })
})

// Route /api/cards
export const getCards = getAll('cards')

// Route /api/card/:id
export const getCardById = getOne('cards')

// Route /api/card/:id
export const deleteCardById = deleteOne('cards')

// Route /api/card/:id
export const updateCardByOwnerId = catchAsync(async (req, res, next) => {
   const { ownerId } = req.params // Extract ownerId from params
   const updateData = req.body // The updated data from request body

   // Log update data to check if it's correct
   console.log('Update Data:', updateData)

   // Update the card based on ownerId
   const updatedCard = await db('cards')
      .where({ ownerId }) // Ensure this is using ownerId, not userId
      .update(updateData) // Apply the update data
      .returning([
         'id',
         'ownerId',
         'cardHolderName',
         'cardNumber',
         'expiryDate',
         'billingAddress',
      ]) // Return non-sensitive fields

   // If no card was updated, return an error
   if (updatedCard.length === 0) {
      return next(new AppError('No card found with that owner ID', 404))
   }

   // Respond with the updated card data
   res.status(200).json({
      status: 'success',
      doc: updatedCard[0], // Return the first item from updated data
   })
})

export const joinCardsWithUsers = catchAsync(async (req, res, next) => {
   const cards = await db('cards as c')
      .leftJoin('users as u', 'c.ownerId', 'u.id')
      .select(
         'c.id',
         'c.cardNumber',
         'c.expiryDate',
         'u.id as userId',
         'u.name',
         'u.email'
      )

   res.status(200).json({
      status: 'success',
      doc: cards,
   })
})

export const joinCardsWithUsersByOwnerId = catchAsync(
   async (req, res, next) => {
      const { id } = req.params // This should now refer to the ownerId, not the card id

      const cards = await db('cards as c')
         .leftJoin('users as u', 'c.ownerId', 'u.id') // Join based on the ownerId
         .select(
            'c.id',
            'c.cardNumber',
            'c.expiryDate',
            'u.id as userId',
            'u.name',
            'u.email'
         )
         .where('c.ownerId', id) // Fetch based on the ownerId
         .first() // Assuming you only need one result. Remove `.first()` if expecting multiple cards.

      if (!cards) {
         return next(new AppError('No card found with that owner ID', 404))
      }

      res.status(200).json({
         status: 'success',
         doc: cards,
      })
   }
)
