import {
   createOne,
   getAll,
   getOne,
   deleteOne,
   updateOne,
} from './handleFactory.js'

// POST create new blog
// Route  /blogs
export const createBlog = createOne('blog')

// GET all blogs
// Route /api/blogs
export const getBlogs = getAll('blog')

// GET blog by id
// Route /api/blogs/:id
export const getBlogById = getOne('blog')

// DELETE blog by id
// Route /api/blogs/:id
export const deleteBlogById = deleteOne('blog')

// UPDATE blog by id
// Route /api/blogs/:id
export const updateBlogById = updateOne('blog')
