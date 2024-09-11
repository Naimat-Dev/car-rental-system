import express from 'express'
import {
   createCustomer,
   deleteCustomerById,
   getCustomerById,
   getCustomers,
   joinAllCustomersDetails,
   joinCustomerDetailsById,
   updateCustomerById,
} from '../../controllers/customer/customersController.js'

import customerValidationSchema from '../../validations/customer/customerValidation.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'

import customerAddressRoutes from './customerAddressRoutes.js'
import customerLicenseRoutes from './customerLicenseRoutes.js'

const router = express.Router()

router.use('/address', customerAddressRoutes)
router.use('/license', customerLicenseRoutes)

router.get('/all/:id', joinCustomerDetailsById)
router.get('/all', joinAllCustomersDetails)

router
   .route('/')
   .post(validateSchema(customerValidationSchema), createCustomer)
   .get(getCustomers)

router
   .route('/:id')
   .get(getCustomerById)
   .delete(deleteCustomerById)
   .put(updateCustomerById)

export default router
