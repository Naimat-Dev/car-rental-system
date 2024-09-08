import express from 'express'
import {
   createCustomer,
   deleteCustomerById,
   getCustomerById,
   getCustomers,
   updateCustomerById,
} from '../controllers/customersController.js'

import customerAddressRoutes from './customerAddressRoutes.js'
import customerLicenseRoutes from './customerLicenseRoutes.js'

const router = express.Router()

router.route('/').post(createCustomer).get(getCustomers)

router.use('/address', customerAddressRoutes)
router.use('/license', customerLicenseRoutes)

router
   .route('/:id')
   .get(getCustomerById)
   .delete(deleteCustomerById)
   .put(updateCustomerById)

export default router
