import express from 'express'
import {
   createBlog,
   getBlogs,
   getBlogById,
   deleteBlogById,
   updateBlogById,
} from '../controllers/blogController.js'
import carValidationSchema from '../validations/car/carValidation.js'
import { validateSchema } from '../middlewares/validationMiddleware.js'

const router = express.Router()

router
   .route('/')
   .post(validateSchema(carValidationSchema), createBlog)
   .get(getBlogs)

router.route('/:id').get(getBlogById).delete(deleteBlogById).put(updateBlogById)

export default router
