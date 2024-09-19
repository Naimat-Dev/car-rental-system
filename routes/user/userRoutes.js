import express from 'express'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import userValidationSchema from '../../validations/user/userValidation.js'
import {
   createUser,
   getUsers,
   getUserById,
   deleteUserById,
   joinAllUsersWithDetails,
   joinUserDetailsById,
   updateOneByUserId
} from '../../controllers/user/userController.js'
import userAddressRoutes from './userAddressRoutes.js'
import { login, logout } from './../../controllers/authController.js'
import { protect } from './../../middlewares/authMiddlware.js'

const router = express.Router()

router.use('/addresses', userAddressRoutes)

router.get('/all', joinAllUsersWithDetails)

router.get('/all/:id', joinUserDetailsById)

router.post('/login', login)
router.post('/logout', protect, logout)

router
   .route('/')
   .post(validateSchema(userValidationSchema), createUser)
   .get(getUsers)

router.route('/:id').get(getUserById).put(updateOneByUserId).delete(deleteUserById)

export default router
