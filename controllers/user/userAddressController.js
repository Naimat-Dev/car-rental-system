import { createOne, getAll, getOne, updateOne, deleteOne, } from '../handleFactory.js'
import db from '../../config/db.js'
import catchAsync from '../../utils/catchAsync.js'

// Route  /userAddress
export const createUserAddress = createOne('user_address')

// Route /api/users
export const getUserAddress = getAll('user_address')

// Route /api/user/:id
export const getUserAddressById = getOne('user_address')

// Route /api/user/:id
export const deleteUserAddressById = deleteOne('user_address')

// Route /api/user/:id
export const updateUserAddressById = updateOne('user_address')

//Routes //api/users/addresses/all/

<<<<<<< HEAD
export const getUserAddressJoin = catchAsync(async (req, res, next) => {
   const userAddresses = await db('user_address as ua')
=======
export const joinUserAddressWithUsers = catchAsync(async (req, res, next) => {
   const userAddresses = await db('userAddress as ua')
>>>>>>> test
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

// Route /api/users/addresses/all/:id
export const joinUserAddressWithUsersById = catchAsync(async (req, res, next) => {
   const { id } = req.params;

<<<<<<< HEAD
   const userAddress = await db('user_address as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id') // Join with users table
=======
   const userAddress = await db('userAddress as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id')
>>>>>>> test
      .select(
         'ua.id',
         'ua.address',
         'ua.city',
         'ua.zipCode',
         'ua.state',
         'u.id as userId',
         'u.email',
         'u.name',
         'u.phoneNumber',
         'u.status',
         'u.registrationDate',
         'u.image',
         'u.cnic',
         'u.role',
         'u.passwordChangedAt'
      )
      .where('ua.id', id)
      .first();

   if (!userAddress) {
      return next(new AppError('No user address found with that ID', 404));
   }

   res.status(200).json({
      status: 'success',
      doc:userAddress,
      
   });
});


<<<<<<< HEAD
export const getUserAddressWithCards = catchAsync(async (req, res, next) => {
   const userAddresses = await db('user_address as ua')
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
=======
>>>>>>> test
