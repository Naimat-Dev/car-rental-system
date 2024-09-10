import express from 'express'
import {
<<<<<<< HEAD
  createCustomer,
  deleteCustomerById,
  getAllCustomersJoin,
  getCustomerById,
  getCustomers,
  getCustomersJoinById,
  updateCustomerById,
} from "../../controllers/customer/customersController.js";
// import { validateSchema } from "../../middlewares/validationMiddleware.js";
import customerValidationSchema from "../../validations/customer/customerValidation.js";
import { validateSchema } from '../../middlewares/validationMiddleware.js';
=======
   createCustomer,
   deleteCustomerById,
   getAllCustomersJoin,
   getCustomerById,
   getCustomers,
   getCustomersJoinById,
   updateCustomerById,
} from '../../controllers/customer/customersController.js'
>>>>>>> 6e9fc482ca97630a98a5daa4a1de0c63fd4c2649

import customerAddressRoutes from './customerAddressRoutes.js'
import customerLicenseRoutes from './customerLicenseRoutes.js'

import { validateSchema } from './../../middlewares/validationMiddleware.js'
import customerValidationSchema from './../../validations/customer/customerValidation.js'

const router = express.Router()

router.use('/address', customerAddressRoutes)
router.use('/license', customerLicenseRoutes)

router.get('/all/:id', getCustomersJoinById)
router.get('/all', getAllCustomersJoin)

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
