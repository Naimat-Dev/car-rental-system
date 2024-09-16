import db from '../../config/db.js'
import AppError from '../../utils/appError.js'
import catchAsync from '../../utils/catchAsync.js'
import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'
import { updateOneByUserId } from './userController.js'

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
export const updateCardById = updateOneByUserId('cards')

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

export const joinCardsWithUsersById = catchAsync(async (req, res, next) => {
   const { id } = req.params

   const card = await db('cards as c')
      .leftJoin('users as u', 'c.ownerId', 'u.id')
      .select(
         'c.id',
         'c.cardNumber',
         'c.expiryDate',
         'u.id as userId',
         'u.name',
         'u.email'
      )
      .where('c.id', id)
      .first()

   if (!card) {
      return next(new AppError('No card found with that ID', 404))
   }

   res.status(200).json({
      status: 'success',
      doc: card,
   })
})
