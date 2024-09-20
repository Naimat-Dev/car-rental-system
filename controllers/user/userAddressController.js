import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'
import db from '../../config/db.js'
import catchAsync from '../../utils/catchAsync.js'
import { updateOneByUserId } from './userController.js'

// Route  /userAddress
export const createUserAddress = createOne('user_address')

// Route /api/users
export const getUserAddress = getAll('user_address')

// Route /api/user/:id
export const getUserAddressById = getOne('user_address')

// Route /api/user/:id
export const deleteUserAddressById = deleteOne('user_address')


//Routes //api/users/addresses/all/
export const updateUserAddressByUserId = catchAsync(async (req, res, next) => {
   const { userId } = req.params;  // Extract userId from params
   const updateData = req.body;    // The updated data from request body

   // Log update data to check if it's correct
   console.log('Update Data:', updateData);

   // Update the user address based on userId
   const updatedCount = await db('user_address')
      .where({ userId })             // Match userId in the table
      .update(updateData)            // Apply the update data
      .returning(['id', 'address', 'city', 'zipCode', 'state']);  // Return non-sensitive fields

   if (updatedCount.length === 0) {
      return next(new AppError('No user address found with that ID', 404));
   }

   // Respond with the updated address
   res.status(200).json({
      status: 'success',
      doc: updatedCount[0],  // Return the first item from updated data
   });
});


export const joinUserAddressWithUsers = catchAsync(async (req, res, next) => {
   const userAddresses = await db('user_address as ua')
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
export const joinUserAddressWithUsersByUserId = catchAsync(
   async (req, res, next) => {
      const { id } = req.params  // This now refers to the userId instead of the address id

      const userAddresses = await db('user_address as ua')
         .leftJoin('users as u', 'ua.userId', 'u.id')  // Join based on userId
         .select(
            'ua.id as addressId',  // Keep the address id in the results
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
            'u.role'
         )
         .where('ua.userId', id)  // Filter based on userId
         .first()  // Remove `.first()` if you expect multiple addresses

      if (!userAddresses) {
         return next(new AppError('No user address found with that user ID', 404))
      }

      res.status(200).json({
         status: 'success',
         doc: userAddresses,
      })
   }
)

