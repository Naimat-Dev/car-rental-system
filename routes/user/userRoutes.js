import express from 'express'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import userValidationSchema from '../../validations/user/userValidation.js'
import {
   createUser, getUsers, getUserById, updateUserById, deleteUserById, joinAllUsersWithDetails, joinUserDetailsById,
} from '../../controllers/user/userController.js'
import userAddressRoutes from "./userAddressRoutes.js"




const router = express.Router()

router.use("/addresses", userAddressRoutes )


router.get('/all', joinAllUsersWithDetails)

router.get('/all/:id', joinUserDetailsById)

router.route('/').post(validateSchema(userValidationSchema), createUser).get(getUsers)

router.route('/:id').get(getUserById).put(updateUserById).delete(deleteUserById)

export default router
