import express from 'express'

import {
   createUser,
   getUsers,
   getUserById,
   updateUserById,
   deleteUserById,
   getAllUsersWithDetails,
   getUserByIdJoin,
} from '../controllers/userController.js'
import {
   createUserAddress,
   getUserAddress,
   getUserAddressById,
   updateUserAddressById,
   deleteUserAddressById,
   getUserAddressJoin,
   getUserAddressByIdJoin,
   getUserAddressWithCards,
} from '../controllers/userAddressController.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import userValidationSchema from '../../validations/user/userValidation.js'
import userAddressValidationSchema from '../../validations/user/userAddressValidation.js'

const router = express.Router()
// Routes for user address management
router
   .route('/addresses')
   .post(validateSchema(userAddressValidationSchema), createUserAddress) // Create a new user address
   .get(getUserAddress) // Get all user addresses

// Get joined user address data
router.get('/addresses/all', getUserAddressJoin)

// Get user address by ID with related user data
router.get('/addresses/all/:id', getUserAddressByIdJoin)

// Get all user addresses with related user data and cards
router.get('/addresses/with-cards', getUserAddressWithCards)

// Handle getting, updating, and deleting user address by ID
router
   .route('/addresses/:id')
   .get(getUserAddressById) // Get user address by ID
   .put(updateUserAddressById) // Update user address by ID
   .delete(deleteUserAddressById) // Delete user address by ID

// Route to get all users with details (joined data)
// Route to get all users with details (joined data)
router.get('/all', getAllUsersWithDetails)

// Route to get specific user by ID with details (joined data)
router.get('/all/:id', getUserByIdJoin)

// Routes for user management
router
   .route('/')
   .post(validateSchema(userValidationSchema), createUser) // Create a new user
   .get(getUsers) // Get all users

router
   .route('/:id')
   .get(getUserById) // Get user by ID
   .put(updateUserById) // Update user by ID
   .delete(deleteUserById) // Delete user by ID

export default router
