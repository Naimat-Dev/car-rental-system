import db from '../../config/db.js'
import AppError from '../../utils/appError.js'
import catchAsync from '../../utils/catchAsync.js'
import { getAll, getOne, updateOne, deleteOne } from '../handleFactory.js'
import bcrypt from "bcrypt";

export const createUser = catchAsync(async (req, res, next) => {
   const {
      email,
      name,
      phoneNumber,
      cnic,
      imageUrl,
      status,
      password,
   } = req.body;

   const existingUser = await db("users")
      .where({ email })
      .orWhere({ cnic })
      .orWhere({ phoneNumber })
      .first();

   if (existingUser) {
      return next(
         new AppError("User with this email, CNIC, or phone number already exists", 400)
      );
   }

   const hashedPassword = await bcrypt.hash(password, 12);

   const doc = await db("users")
      .insert({
         email,
         name,
         phoneNumber,
         cnic,
         status: status || "inactive",
         registrationDate: new Date(),
         image: imageUrl,
         password: hashedPassword,
      })
      .returning("*");

   res.status(201).json({
      status: "success",
      doc,
   });
});


// Route /api/users
export const getUsers = getAll('users')

// Route /api/user/:id
export const getUserById = getOne('users')

// Route /api/user/:id
export const deleteUserById = deleteOne('users')

// Route /api/user/:id
export const updateUserById = updateOne('users')


// GET all users with their addresses and cards
// Route /api/users/join
export const joinAllUsersWithDetails = catchAsync(async (req, res, next) => {
   const userFields = [
      'u.id',
      'u.email',
      'u.name',
      'u.phoneNumber',
      'u.status',
      'u.registrationDate',
      'u.image',
      'u.cnic',
      'u.role',
   ];

   const addressFields = [
      'ua.address',
      'ua.city',
      'ua.zipCode',
      'ua.state'
   ];

   const cardFields = [
      'c.cardNumber',
      'c.cardHolderName',
      'c.expiryDate'
   ];

   const allFields = [
      ...userFields,
      ...addressFields,
      ...cardFields
   ];

   const users = await db('users as u')
      .leftJoin('userAddress as ua', 'u.id', 'ua.userId')
      .leftJoin('cards as c', 'u.id', 'c.ownerId')
      .select(allFields);

   res.status(200).json({
      status: 'success',
      doc: users
   });
});



// GET user by id with address and cards
// Route /api/users/:id
export const joinUserDetailsById = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const user = await db('users as u')
      .leftJoin('userAddress as ua', 'u.id', 'ua.userId')
      .leftJoin('cards as c', 'u.id', 'c.ownerId')
      .select(
         'u.id',
         'u.email',
         'u.name',
         'u.phoneNumber',
         'u.status',
         'u.registrationDate',
         'u.image',
         'u.cnic',
         'u.role',
         'u.passwordChangedAt',
         'ua.address',
         'ua.city',
         'ua.zipCode',
         'ua.state',
         'c.cardNumber',
         'c.cardHolderName',
         'c.expiryDate'
      )
      .where('u.id', id)
      .first();

   if (!user) return next(new AppError('No user found with that ID', 404));

   const { password, passwordResetToken, passwordResetExpires, cvv, ...filterData } = user;

   res.status(200).json({
      status: 'success',
      doc:
         filterData,

   });
});
