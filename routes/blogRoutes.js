import express from 'express'
import {
   createBlog,
   getBlogs,
   getBlogById,
   deleteBlogById,
   updateBlogById,
} from '../controllers/blogController.js'

const router = express.Router()

router.route('/').post(createBlog).get(getBlogs)

router.route('/:id').get(getBlogById).delete(deleteBlogById).put(updateBlogById)

export default router
