import express from 'express'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import userAddressValidationSchema from '../../validations/user/userAddressValidation.js'

import {
    createUserAddress, getUserAddress, getUserAddressById, updateUserAddressById, deleteUserAddressById,
    joinUserAddressWithUsers, joinUserAddressWithUsersById, 
} from '../../controllers/user/userAddressController.js'



const router = express.Router()
router
    .route('/')
    .post(validateSchema(userAddressValidationSchema), createUserAddress)
    .get(getUserAddress)

router.get('/all', joinUserAddressWithUsers)

router.get('/all/:id', joinUserAddressWithUsersById)

router.route('/:id').get(getUserAddressById).put(updateUserAddressById).delete(deleteUserAddressById)


export default router
