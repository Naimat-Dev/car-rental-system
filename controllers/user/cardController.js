import db from '../../config/db.js'
import AppError from '../../utils/appError.js'
import catchAsync from '../../utils/catchAsync.js'
import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'

// POST create new card
// Route  /cards
// CREATE One Document
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

   if (!ownerId || !cardHolderName || !cardNumber || !expiryDate || !cvv) {
      return next(new AppError('Required fields are missing', 400))
   }

   const existingCard = await db('cards').where({ cardNumber }).first()

   if (existingCard) {
      return next(
         new AppError('Card with this card number already exists', 400)
      )
   }
   const [doc] = await db('cards')
      .insert({
         ownerId,
         ownerType: ownerType || 'customer',
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

// GET all cards
// Route /api/cards
export const getCards = getAll('cards')

// GET card by id
// Route /api/card/:id
export const getCardById = getOne('cards')

// DELETE card by id
// Route /api/card/:id
export const deleteCardById = deleteOne('cards')

// UPDATE card by id
// Route /api/card/:id
export const updateCardById = updateOne('cards')

//Routes //api/cards/all/
export const getCardsJoin = catchAsync(async (req, res, next) => {
   const cards = await db('cards as c')
      .leftJoin('users as u', 'c.userId', 'u.id') // Join with users
      .select('*') // Select all fields from both tables

   // Remove sensitive fields such as CVV, password, etc.
   const cardsWithoutSensitiveData = cards.map(
      ({ password, passwordResetToken, passwordResetExpires, cvv, ...rest }) =>
         rest
   )

   res.status(200).json({
      status: 'success',
      doc: {
         cards: cardsWithoutSensitiveData,
      },
   })
})

//Routes //api/cards/all/:id
export const getCardByIdJoin = catchAsync(async (req, res, next) => {
   const { id } = req.params

   const card = await db('cards as c')
      .leftJoin('users as u', 'c.userId', 'u.id') // Join with users
      .select('*') // Select all fields
      .where('c.id', id)
      .first()

   if (!card) {
      return next(new AppError('No card found with that ID', 404))
   }

   // Remove sensitive fields such as CVV, password, etc.
   const {
      password,
      passwordResetToken,
      passwordResetExpires,
      cvv,
      ...cardWithoutSensitiveData
   } = card

   res.status(200).json({
      status: 'success',
      doc: {
         card: cardWithoutSensitiveData,
      },
   })
})
