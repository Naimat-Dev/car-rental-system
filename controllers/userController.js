import db from "../config/db.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";

import catchAsync from "../utils/catchAsync.js";
import { createOne, getAll, getOne, updateOne, deleteOne } from "./handleFactory.js";


// Create user
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
  
    // Check if a user with the given email, cnic, or phoneNumber already exists
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
  
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log('Hashed Password:', hashedPassword);  // To verify it's being hashed correctly

    // Insert the new user with hashed password
    const [doc] = await db("users")
      .insert({
        email,
        name,
        phoneNumber,
        cnic,
        status: status || "inactive",
        registrationDate: new Date(),
        image: imageUrl,
        password: hashedPassword, // Insert hashed password
      })
      .returning("*");

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = doc;

    res.status(201).json({
      status: "success",
      doc: userWithoutPassword, // Password is excluded from the response
    });
});

// GET all users
// Route /api/users
export const getUsers = getAll("users");

// GET user by id
// Route /api/user/:id
export const getUserById = getOne("users");

// DELETE user by id
// Route /api/user/:id
export const deleteUserById = deleteOne("users");

// UPDATE user by id
// Route /api/user/:id
export const updateUserById = updateOne("users");

// GET all users with their addresses and cards
// Route /api/users/join


export const getAllUsersWithDetails = catchAsync(async (req, res, next) => {
    // Fields to include
    const userFields = [
        'users.id',
        'users.email',
        'users.name',
        'users.phoneNumber',
        'users.status',
        'users.registrationDate',
        'users.image',
        'users.cnic',
        'users.role',
        'users.passwordChangedAt'
    ];

    const addressFields = [
        'userAddress.address',
        'userAddress.city',
        'userAddress.zipCode',
        'userAddress.state'
    ];

    const cardFields = [
        'cards.cardNumber',
        'cards.cardHolderName',
        'cards.expiryDate'
        // Do not include 'cards.cvv'
    ];

    // Combine all fields
    const allFields = [
        ...userFields,
        ...addressFields,
        ...cardFields
    ];

    // Fetch data from database
    const users = await db('users')
        .leftJoin('userAddress', 'users.id', 'userAddress.userId') // Left join userAddress
        .leftJoin('cards', 'users.id', 'cards.userId') // Left join cards
        .select(allFields);

    // Filter out any additional sensitive data
    const sanitizedUsers = users.map(user => {
        // Exclude sensitive fields explicitly
        const { passwordResetToken, passwordResetExpires, cvv, ...rest } = user;
        return rest;
    });

    res.status(200).json({
        status: 'success',
        doc: sanitizedUsers
    });
});


// GET user by id with address and cards
// Route /api/users/:id
export const getUserByIdJoin = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await db('users')
        .leftJoin('userAddress', 'users.id', 'userAddress.userId') // Join with userAddress table
        .leftJoin('cards', 'users.id', 'cards.userId') // Join with cards table
        .select(
            'users.id',
            'users.email',
            'users.name',
            'users.phoneNumber',
            'users.status',
            'users.registrationDate',
            'users.image',
            'users.cnic',
            'users.role',
            'users.passwordChangedAt',
            'userAddress.address',
            'userAddress.city',
            'userAddress.zipCode',
            'userAddress.state',
            'cards.cardNumber',
            'cards.cardHolderName',
            'cards.expiryDate'
        )
        .where('users.id', id)
        .first();

    if (!user) {
        return next(new AppError('No user found with that ID', 404));
    }

    // Exclude sensitive fields explicitly
    const { passwordResetToken, passwordResetExpires, cvv, ...userWithoutSensitiveData } = user;

    res.status(200).json({
        status: 'success',
        data: {
            user: userWithoutSensitiveData
        }
    });
});
