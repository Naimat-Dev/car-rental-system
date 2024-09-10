import express from 'express'
import {
   createBrand,
   getBrands,
   getBrandById,
   deleteBrandById,
   updateBrandById,
} from '../../controllers/car/brandController.js'
import { getOneByCarId } from '../../controllers/car/carController.js'
import { validateSchema } from '../../middlewares/validationMiddleware.js'
import brandValidationSchema from '../../validations/car/brandValidation.js'
const router = express.Router()

// Define routes for the /brands endpoint
router
   .route('/')
   .post(validateSchema(brandValidationSchema), createBrand) 
   .get(getBrands) 

// Define routes for the /brands/:id endpoint
router
   .route('/:id')
   .get(getBrandById) 
   .delete(deleteBrandById) 
   .put(updateBrandById) 

router.route('/:cardId').get(getOneByCarId)

export default router
