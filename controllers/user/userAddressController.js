import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'
import db from '../../config/db.js'
import catchAsync from '../../utils/catchAsync.js'

// POST create new User Address
// Route  /userAddress
export const createUserAddress = createOne('userAddress')

// GET all users
// Route /api/users
export const getUserAddress = getAll('userAddress')

// GET user by id
// Route /api/user/:id
export const getUserAddressById = getOne('userAddress')

// DELETE user by id
// Route /api/user/:id
export const deleteUserAddressById = deleteOne('userAddress')

// UPDATE user by id
// Route /api/user/:id
export const updateUserAddressById = updateOne('userAddress')

//Routes //api/users/addresses/all/

export const getUserAddressJoin = catchAsync(async (req, res, next) => {
   const userAddresses = await db('userAddress as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id')
      .select('*')

   const addressesWithoutSensitiveData = userAddresses.map(
      ({ password, passwordResetToken, passwordResetExpires, ...rest }) => rest
   )

   res.status(200).json({
      status: 'success',
      doc: {
         userAddresses: addressesWithoutSensitiveData,
      },
   })
})

//Routes //api/users/addresses/all/:id

export const getUserAddressByIdJoin = catchAsync(async (req, res, next) => {
   const { id } = req.params

   const userAddress = await db('userAddress as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id') // Join with users
      .select('*') // Select all fields from both tables
      .where('ua.id', id)
      .first()

   if (!userAddress) {
      return next(new AppError('No user address found with that ID', 404))
   }

   // Remove any sensitive or unwanted fields (e.g., password, reset token)
   const {
      password,
      passwordResetToken,
      passwordResetExpires,
      ...userAddressWithoutSensitiveData
   } = userAddress

   res.status(200).json({
      status: 'success',
      doc: {
         userAddress: userAddressWithoutSensitiveData,
      },
   })
})

//Routes //api/users/addresses/with-cards

export const getUserAddressWithCards = catchAsync(async (req, res, next) => {
   const userAddresses = await db('userAddress as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id') // Join with users
      .leftJoin('cards as c', 'u.id', 'c.userId') // Join with cards
      .select('*') // Select all fields from the joined tables

   // Remove any sensitive fields (e.g., password, CVV)
   const addressesWithoutSensitiveData = userAddresses.map(
      ({ password, passwordResetToken, passwordResetExpires, cvv, ...rest }) =>
         rest
   )

   res.status(200).json({
      status: 'success',
      doc: {
         userAddresses: addressesWithoutSensitiveData,
      },
   })
})
