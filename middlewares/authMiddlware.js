import jwt from 'jsonwebtoken'

import { promisify } from 'util'
import AppError from './../utils/appError.js'
import catchAsync from './../utils/catchAsync.js'

export const protect = catchAsync(async (req, res, next) => {
   // Getting token and check of it's there
   let token

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1]
   }

   if (!token) {
      return next(
         new AppError(
            'You are not logged in! Please log in to get access.',
            401
         )
      )
   }

   // Verification token
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

   const { userId } = decoded

   // Check if user still exists
   const user = await db('users').where({ userId })

   if (!user) {
      return next(
         new AppError(
            'The token belonging to this user does no longer exist.',
            401
         )
      )
   }

   // GRANT ACCESS TO PROTECTED ROUTE
   req.user = user

   next()
})

// restrictTo is a Wrapper function to return the middleware function
export const restrictTo = (...roles) => {
   return (req, res, next) => {
      // roles is array: ['admin']

      if (!roles.includes(req.user.role)) {
         return next(
            new AppError(
               'You do not have permission to perform this action.',
               403
            )
         ) // 403: Forbiden
      }

      next()
   }
}
