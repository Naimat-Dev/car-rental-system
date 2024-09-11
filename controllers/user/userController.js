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
import bcrypt from 'bcrypt'

// POST create new user
// Route  /users
// Create user
// Create user
export const createUser = catchAsync(async (req, res, next) => {
   const {
      email,
      name,
      phoneNumber,
      cnic,
      dateOfBirth,
      imageUrl,
      status,
      password,
   } = req.body

   // Check if a user with the given email, cnic, or phoneNumber already exists
   const existingUser = await db('users')
      .where({ email })
      .orWhere({ cnic })
      .orWhere({ phoneNumber })
      .first()

   if (existingUser) {
      return next(
         new AppError(
            'User with this email, CNIC, or phone number already exists',
            400
         )
      )
   }

   // Hash the password before saving
   const hashedPassword = await bcrypt.hash(password, 12)

   // Insert the new user
   const doc = await db('users')
      .insert({
         email,
         name,
         phoneNumber,
         cnic,
         status: status || 'inactive', // Default status is 'inactive'
         registrationDate: new Date(), // Assuming you're using the current date
         image: imageUrl, // Save the provided image URL
         password: hashedPassword, // Save the hashed password
      })
      .returning('*')

   // Respond with success status and the newly created user
   res.status(201).json({
      status: 'success',
      doc,
   })
})

// GET all users
// Route /api/users
export const getUsers = getAll('users')

// GET user by id
// Route /api/user/:id
export const getUserById = getOne('users')

// DELETE user by id
// Route /api/user/:id
export const deleteUserById = deleteOne('users')

// Route /api/user/:id
export const updateUserById = updateOne('users')

// GET all users with their addresses and cards
// Route /api/users/join
export const getAllUsersWithDetails = catchAsync(async (req, res, next) => {
   // Define the fields to select from users, userAddress, and cards
   const userFields = [
      'u.id',
      'u.email',
      'u.name',
      'u.phoneNumber',
      'u.status',
      'u.registrationDate',
      'u.image',
      'u.cnic',
      'u.role',
      'u.passwordChangedAt',
   ]

   const addressFields = ['ua.address', 'ua.city', 'ua.zipCode', 'ua.state']

   const cardFields = [
      'c.cardNumber',
      'c.cardHolderName',
      'c.expiryDate',
      // Excluding 'cvv' from selection
   ]

   // Combine all fields
   const allFields = [...userFields, ...addressFields, ...cardFields]

   // Adjust the column name in the join statement if needed
   const users = await db('users as u')
      .leftJoin('userAddress as ua', 'u.id', 'ua.userId') // Join with userAddress table
      .leftJoin('cards as c', 'u.id', 'c.ownerId') // Adjust this line based on actual column name
      .select(allFields)

   // Send response with sanitized data
   res.status(200).json({
      status: 'success',
      doc: {
         users,
      },
   })
})

// GET user by id with address and cards
// Route /api/users/:id
export const getUserByIdJoin = catchAsync(async (req, res, next) => {
   const { id } = req.params

   const user = await db('users as u')
      .leftJoin('userAddress as ua', 'u.id', 'ua.userId') // Adjust if necessary
      .leftJoin('cards as c', 'u.id', 'c.ownerId') // Adjust to correct column name
      .select(
         'u.id',
         'u.email',
         'u.name',
         'u.phoneNumber',
         'u.status',
         'u.registrationDate',
         'u.image',
         'u.cnic',
         'u.role',
         'u.passwordChangedAt',
         'ua.address',
         'ua.city',
         'ua.zipCode',
         'ua.state',
         'c.cardNumber',
         'c.cardHolderName',
         'c.expiryDate'
      )
      .where('u.id', id)
      .first()

   if (!user) return next(new AppError('No user found with that ID', 404))

   // Remove sensitive fields such as the password
   const {
      password,
      passwordResetToken,
      passwordResetExpires,
      cvv,
      ...userWithoutSensitiveData
   } = user

   res.status(200).json({
      status: 'success',
      data: {
         user: userWithoutSensitiveData,
      },
   })
})
