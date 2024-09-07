import express from 'express'
import {
   createCustomer,
   deleteCustomerById,
   getCustomerById,
   getCustomers,
   getCustomersWithJoin,
   updateCustomerById,
} from '../controllers/customersController.js'
import customerAddressRoutes from './customerAddressRoutes.js'
import customerLicenseRoutes from './customerLicenseRoutes.js'

const router = express.Router()

router.use('/address', customerAddressRoutes)
router.use('/license', customerLicenseRoutes)

router.route('/').post(createCustomer).get(getCustomers)

router.get('/join', getCustomersWithJoin)

router
   .route('/:id')
   .get(getCustomerById)
   .delete(deleteCustomerById)
   .put(updateCustomerById)

export default router
