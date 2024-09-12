import express from 'express'

import {
   createCustomerAddress,
   deleteCustomerAddressById,
   getCustomerAddress,
   getCustomerAddressById,
   updateCustomerAddressById,
} from '../../controllers/customer/customerAddressController.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import customerAddressValidationSchema from '../../validations/customer/customerAddressValidation.js'

const router = express.Router()

router
   .route('/')
   .post(validateSchema(customerAddressValidationSchema), createCustomerAddress)
   .get(getCustomerAddress)

router
   .route('/:id')
   .get(getCustomerAddressById)
   .delete(deleteCustomerAddressById)
   .put(updateCustomerAddressById)

export default router
